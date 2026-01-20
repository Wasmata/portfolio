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

    // 1. Validate Form Fields (Phone is now optional)
    if (!firstName || !lastName || !email || !message) {
        return res.status(400).json({ error: 'Please fill in all required fields.' });
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
        const displayPhone = phone || 'Not provided';

        // Prepare content based on language
        const lang = req.body.language || 'fr';
        const isFr = lang === 'fr';

        const userSubject = isFr
            ? `Confirmation de réception - Wassim Maataoui`
            : `Message Received - Wassim Maataoui`;

        // Modern Email Template
        const userHtml = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
                body { margin: 0; padding: 0; background-color: #f4f4f5; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; }
                .container { max-width: 600px; margin: 40px auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05); }
                .header { background: #18181b; padding: 32px 20px; text-align: center; }
                .header h1 { color: #ffffff; margin: 0; font-size: 24px; font-weight: 600; letter-spacing: -0.5px; }
                .content { padding: 40px 32px; color: #3f3f46; line-height: 1.6; font-size: 16px; }
                .button { display: inline-block; background: #2563eb; color: #ffffff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 500; margin-top: 24px; }
                .footer { background: #fafafa; padding: 24px; text-align: center; color: #a1a1aa; font-size: 12px; border-top: 1px solid #f4f4f5; }
                .info-item { margin-bottom: 8px; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>Wassim Maataoui</h1>
                </div>
                <div class="content">
                    ${isFr ? `
                        <h2 style="margin-top: 0; color: #18181b;">Bonjour ${firstName},</h2>
                        <p>Merci de m'avoir contacté ! 👋</p>
                        <p>J'ai bien reçu votre message. Je suis actuellement en train de le lire et je reviendrai vers vous très rapidement (généralement sous 24h).</p>
                        <p>En attendant, n'hésitez pas à jeter un œil à mes derniers projets.</p>
                        <center><a href="https://wassidev.fr" class="button">Voir mon Portfolio</a></center>
                    ` : `
                        <h2 style="margin-top: 0; color: #18181b;">Hello ${firstName},</h2>
                        <p>Thanks for reaching out! 👋</p>
                        <p>I have received your message safely. I am currently reading it and will get back to you very soon (usually within 24h).</p>
                        <p>In the meantime, feel free to check out my latest projects.</p>
                        <center><a href="https://wassidev.fr" class="button">Visit Portfolio</a></center>
                    `}
                </div>
                <div class="footer">
                    <p>&copy; ${new Date().getFullYear()} Wassim Maataoui. All rights reserved.</p>
                    <p>Paris, France • contact@wassidev.fr</p>
                </div>
            </div>
        </body>
        </html>
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
                    <p><strong>Phone:</strong> ${displayPhone}</p>
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
