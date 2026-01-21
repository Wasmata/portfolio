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
            ? `Confirmation de réception - Wassidev`
            : `Message Received - Wassidev`;

        // Modern Premium Email Template (Dark Mode / Wassidev Style)
        const userHtml = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Wassidev Notification</title>
        </head>
        <body style="margin: 0; padding: 0; background-color: #050505; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
            
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #050505; width: 100%; text-align: center;">
                <tr>
                    <td align="center" style="padding: 40px 10px;">
                        
                        <!-- Main Card -->
                        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width: 600px; background-color: #0a0a0a; border: 1px solid #1f1f1f; border-radius: 16px; overflow: hidden; box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);">
                            
                            <!-- Header / Logo Area -->
                            <tr>
                                <td style="padding: 40px 0 20px 0; text-align: center;">
                                    <h1 style="margin: 0; font-size: 28px; font-weight: 700; letter-spacing: -1px; color: #ffffff;">
                                        Wassidev<span style="color: #6366f1;">.</span>fr
                                    </h1>
                                </td>
                            </tr>

                            <!-- Content Area -->
                            <tr>
                                <td style="padding: 0 40px 40px 40px; text-align: left;">
                                    ${isFr ? `
                                        <p style="color: #a1a1aa; font-size: 16px; margin-bottom: 24px;">Bonjour <strong style="color: #ffffff;">${firstName}</strong>,</p>
                                        <p style="color: #d4d4d8; font-size: 16px; line-height: 1.6; margin-bottom: 24px;">
                                            Merci d'avoir pris le temps de me contacter. J'ai bien reçu votre message et je l'examine actuellement avec attention. ⚡️
                                        </p>
                                        <p style="color: #d4d4d8; font-size: 16px; line-height: 1.6; margin-bottom: 32px;">
                                            Je m'efforce de répondre à toutes les demandes sous 24h. En attendant, n'hésitez pas à explorer mon portfolio pour voir mes dernières réalisations.
                                        </p>
                                        <table role="presentation" border="0" cellspacing="0" cellpadding="0" style="width: 100%;">
                                            <tr>
                                                <td align="center">
                                                    <a href="https://wassidev.fr" style="display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%); color: #ffffff; text-decoration: none; font-weight: 600; border-radius: 50px; font-size: 16px; letter-spacing: 0.5px;">Accéder au Site</a>
                                                </td>
                                            </tr>
                                        </table>
                                    ` : `
                                        <p style="color: #a1a1aa; font-size: 16px; margin-bottom: 24px;">Hello <strong style="color: #ffffff;">${firstName}</strong>,</p>
                                        <p style="color: #d4d4d8; font-size: 16px; line-height: 1.6; margin-bottom: 24px;">
                                            Thanks for reaching out! I have received your message safely and am currently reviewing it. ⚡️
                                        </p>
                                        <p style="color: #d4d4d8; font-size: 16px; line-height: 1.6; margin-bottom: 32px;">
                                            I aim to get back to everyone within 24h. In the meantime, feel free to check out my latest work on my portfolio.
                                        </p>
                                        <table role="presentation" border="0" cellspacing="0" cellpadding="0" style="width: 100%;">
                                            <tr>
                                                <td align="center">
                                                    <a href="https://wassidev.fr" style="display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%); color: #ffffff; text-decoration: none; font-weight: 600; border-radius: 50px; font-size: 16px; letter-spacing: 0.5px;">Visit Portfolio</a>
                                                </td>
                                            </tr>
                                        </table>
                                    `}
                                </td>
                            </tr>

                            <!-- Footer -->
                            <tr>
                                <td style="background-color: #0f0f0f; padding: 24px; text-align: center; border-top: 1px solid #1f1f1f;">
                                    <p style="color: #52525b; font-size: 12px; margin: 0 0 8px 0;">
                                        &copy; ${new Date().getFullYear()} Wassim Maataoui. All rights reserved.
                                    </p>
                                    <p style="color: #52525b; font-size: 12px; margin: 0;">
                                        France • <a href="mailto:contact@wassidev.fr" style="color: #52525b; text-decoration: underline;">contact@wassidev.fr</a>
                                    </p>
                                    <div style="margin-top: 16px;">
                                        <span style="display: inline-block; width: 4px; height: 4px; background: #27272a; border-radius: 50%; margin: 0 4px;"></span>
                                        <span style="display: inline-block; width: 4px; height: 4px; background: #3f3f46; border-radius: 50%; margin: 0 4px;"></span>
                                        <span style="display: inline-block; width: 4px; height: 4px; background: #27272a; border-radius: 50%; margin: 0 4px;"></span>
                                    </div>
                                </td>
                            </tr>
                        </table>
                        
                        <!-- Mini Branding Bottom -->
                        <p style="text-align: center; margin-top: 24px; color: #3f3f46; font-size: 12px; font-family: monospace;">
                            SECURED BY WASSIDEV
                        </p>

                    </td>
                </tr>
            </table>
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
                from: 'Wassidev <contact@wassidev.fr>',
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
