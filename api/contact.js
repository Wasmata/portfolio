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

    // 3. Send Emails with Resend (Admin + Auto-Reply)
    try {
        const fullName = `${firstName} ${lastName}`;
        const userIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

        // Prepare content based on language
        const lang = req.body.language || 'fr';
        const isFr = lang === 'fr';

        const userSubject = isFr
            ? `Confirmation de réception - Wassim Maataoui`
            : `Message Received - Wassim Maataoui`;

        const userHtml = isFr
            ? `
                <h3>Bonjour ${firstName},</h3>
                <p>Merci de m'avoir contacté. J'ai bien reçu votre message et je vous répondrai dans les meilleurs délais (généralement sous 24h).</p>
                <p>Cordialement,<br><strong>Wassim Maataoui</strong></p>
                <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
                <p style="color: #666; font-size: 12px;">Ceci est un message automatique, merci de ne pas y répondre directement.</p>
            `
            : `
                <h3>Hello ${firstName},</h3>
                <p>Thank you for contacting me. I have received your message and will get back to you as soon as possible (usually within 24h).</p>
                <p>Best regards,<br><strong>Wassim Maataoui</strong></p>
                <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
                <p style="color: #666; font-size: 12px;">This is an automated message, please do not reply directly.</p>
            `;

        // Send both emails in parallel
        const [adminSend, userSend] = await Promise.allSettled([
            // 1. Admin Notification (To You)
            resend.emails.send({
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
            }),
            // 2. Auto-Reply (To User)
            resend.emails.send({
                from: 'Wassim Maataoui <contact@wassidev.fr>',
                to: [email],
                subject: userSubject,
                html: userHtml,
            })
        ]);

        // Check if Admin email failed (Critical)
        if (adminSend.status === 'rejected' || (adminSend.value && adminSend.value.error)) {
            const error = adminSend.status === 'rejected' ? adminSend.reason : adminSend.value.error;
            console.error('Resend Admin API Error:', error);
            return res.status(500).json({
                error: 'Failed to send message via Resend.',
                details: error.message
            });
        }

        // We accept if User email fails (Non-critical), but we can log it.
        if (userSend.status === 'rejected' || (userSend.value && userSend.value.error)) {
            console.warn('Auto-reply failed:', userSend.status === 'rejected' ? userSend.reason : userSend.value.error);
        }

        return res.status(200).json({ success: 'Message sent successfully!', id: adminSend.value.data.id });

    } catch (error) {
        console.error('Unexpected Error:', error);
        return res.status(500).json({
            error: 'An unexpected error occurred.',
            details: error.message
        });
    }
}
