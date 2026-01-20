import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

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

    // 3. Send Email with Resend
    try {
        const fullName = `${firstName} ${lastName}`;
        const userIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

        const { data, error } = await resend.emails.send({
            from: 'Portfolio Contact <contact@wassidev.fr>',
            to: ['contact@wassidev.fr'],
            replyTo: email,
            subject: `New Contact from Portfolio: ${fullName}`,
            html: `
                <h3>New Contact Message</h3>
                <p><strong>Name:</strong> ${fullName}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone}</p>
                <p><strong>IP:</strong> ${userIp}</p>
                <hr />
                <p><strong>Message:</strong></p>
                <p>${message.replace(/\n/g, '<br>')}</p>
            `,
        });

        if (error) {
            console.error('Resend API Error:', error);
            // Return the specific Resend error message to the client for debugging
            return res.status(500).json({
                error: 'Failed to send message via Resend.',
                details: error.message
            });
        }

        return res.status(200).json({ success: 'Message sent successfully!', id: data.id });

    } catch (error) {
        console.error('Unexpected Error:', error);
        return res.status(500).json({
            error: 'An unexpected error occurred.',
            details: error.message
        });
    }
}
