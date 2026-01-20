import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { firstName, lastName, email, phone, message, turnstileToken } = req.body;

    // 1. Validate Form Fields
    if (!firstName || !lastName || !email || !phone || !message) {
        return res.status(400).json({ error: 'Please fill in all fields.' });
    }

    // 2. Validate Turnstile Token (Backend Verification)
    if (!turnstileToken) {
        return res.status(400).json({ error: 'CAPTCHA missing.' });
    }

    try {
        const verifyResponse = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                secret: process.env.TURNSTILE_SECRET_KEY,
                response: turnstileToken,
                remoteip: req.headers['x-forwarded-for']
            }),
        });
        const verifyResult = await verifyResponse.json();

        if (!verifyResult.success) {
            return res.status(400).json({ error: 'CAPTCHA verification failed.' });
        }
    } catch (err) {
        console.error('Turnstile Verify Error:', err);
        return res.status(500).json({ error: 'CAPTCHA verification error.' });
    }

    // 3. Configure Nodemailer
    // Note: Vercel environment variables must be set in the Vercel Dashboard
    const transporter = nodemailer.createTransport({
        host: 'smtp.ionos.fr',
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    try {
        const userIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        const fullName = `${firstName} ${lastName}`;

        await transporter.sendMail({
            from: `"${fullName}" <${process.env.EMAIL_USER}>`,
            replyTo: email,
            to: 'contact@wassidev.fr',
            subject: `New Contact from Portfolio: ${fullName}`,
            text: `Name: ${fullName}\nEmail: ${email}\nPhone: ${phone}\nIP: ${userIp}\n\nMessage:\n${message}`,
            html: `
                <h3>New Contact Message</h3>
                <p><strong>First Name:</strong> ${firstName}</p>
                <p><strong>Last Name:</strong> ${lastName}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone}</p>
                <p><strong>IP Address:</strong> ${userIp}</p>
                <p><strong>Message:</strong></p>
                <p>${message.replace(/\n/g, '<br>')}</p>
            `
        });

        return res.status(200).json({ success: 'Message sent successfully!' });
    } catch (error) {
        console.error('Email Send Error:', error);
        return res.status(500).json({
            error: 'Failed to send message.',
            details: error.message // Exposing error details for debugging
        });
    }
}
