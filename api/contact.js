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

        // Ticket ID Simulation
        const ticketId = 'REQ-' + Math.random().toString(36).substr(2, 9).toUpperCase();
        const timestamp = new Date().toISOString().replace('T', ' ').substr(0, 16).replace(/:/g, 'h');

        // Professional Neutral Email Template (Minimalist Dark)
        const userHtml = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Wassidev Notification</title>
        </head>
        <body style="margin: 0; padding: 0; background-color: #f4f4f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
            
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f4f4f5; width: 100%; text-align: center;">
                <tr>
                    <td align="center" style="padding: 40px 10px;">
                        
                        <!-- Main Card -->
                        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05); border: 1px solid #e4e4e7;">
                            
                            <!-- Header (Simple & Clean) -->
                            <tr>
                                <td style="padding: 32px 32px 0 32px; text-align: left;">
                                    <h1 style="margin: 0; font-size: 24px; font-weight: 700; color: #18181b; letter-spacing: -0.5px;">
                                        Wassidev<span style="color: #6366f1;">.</span>
                                    </h1>
                                </td>
                            </tr>

                            <!-- Content Area -->
                            <tr>
                                <td style="padding: 32px; text-align: left;">
                                    
                                    <!-- Status Badge (Neutral) -->
                                    <div style="margin-bottom: 24px;">
                                        <span style="background-color: #f4f4f5; border: 1px solid #e4e4e7; color: #52525b; padding: 6px 12px; border-radius: 100px; font-size: 12px; font-weight: 600; font-family: monospace;">
                                            ● ${isFr ? 'Reçu / Confirmed' : 'Received / Confirmed'}
                                        </span>
                                    </div>

                                    ${isFr ? `
                                        <p style="color: #3f3f46; font-size: 16px; margin-bottom: 16px;">Bonjour <strong>${firstName}</strong>,</p>
                                        <p style="color: #52525b; font-size: 16px; line-height: 1.6; margin-bottom: 24px;">
                                            Merci pour votre message. Je l'ai bien reçu et je vais le traiter dans les plus brefs délais.<br>
                                            En général, je réponds sous 24 heures.
                                        </p>
                                        
                                        <!-- Tech Details Block (Minimal) -->
                                        <div style="background-color: #fafafa; border: 1px solid #f4f4f5; border-radius: 8px; padding: 16px; margin-bottom: 32px;">
                                            <p style="margin: 0; color: #71717a; font-size: 12px; font-family: monospace; line-height: 1.6;">
                                                Ticket: <span style="color: #18181b;">${ticketId}</span><br>
                                                Date: <span style="color: #18181b;">${timestamp}</span>
                                            </p>
                                        </div>

                                        <table role="presentation" border="0" cellspacing="0" cellpadding="0">
                                            <tr>
                                                <td align="left">
                                                    <a href="https://wassidev.fr" style="display: inline-block; padding: 12px 24px; background-color: #18181b; color: #ffffff; text-decoration: none; font-weight: 500; border-radius: 6px; font-size: 14px;">Retour au site</a>
                                                </td>
                                            </tr>
                                        </table>
                                    ` : `
                                        <p style="color: #3f3f46; font-size: 16px; margin-bottom: 16px;">Hello <strong>${firstName}</strong>,</p>
                                        <p style="color: #52525b; font-size: 16px; line-height: 1.6; margin-bottom: 24px;">
                                            Thanks for reaching out. I have received your message and will review it shortly.<br>
                                            I typically reply within 24 hours.
                                        </p>

                                        <!-- Tech Details Block (Minimal) -->
                                        <div style="background-color: #fafafa; border: 1px solid #f4f4f5; border-radius: 8px; padding: 16px; margin-bottom: 32px;">
                                            <p style="margin: 0; color: #71717a; font-size: 12px; font-family: monospace; line-height: 1.6;">
                                                Ticket: <span style="color: #18181b;">${ticketId}</span><br>
                                                Date: <span style="color: #18181b;">${timestamp}</span>
                                            </p>
                                        </div>

                                        <table role="presentation" border="0" cellspacing="0" cellpadding="0">
                                            <tr>
                                                <td align="left">
                                                    <a href="https://wassidev.fr" style="display: inline-block; padding: 12px 24px; background-color: #18181b; color: #ffffff; text-decoration: none; font-weight: 500; border-radius: 6px; font-size: 14px;">Return to portfolio</a>
                                                </td>
                                            </tr>
                                        </table>
                                    `}
                                </td>
                            </tr>

                            <!-- Footer (Minimal) -->
                            <tr>
                                <td style="background-color: #ffffff; padding: 24px 32px; border-top: 1px solid #f4f4f5;">
                                    <p style="color: #a1a1aa; font-size: 12px; margin: 0; font-family: -apple-system, sans-serif;">
                                        &copy; ${new Date().getFullYear()} Wassim Maataoui • France<br>
                                        <span style="color: #d4d4d8;">Automated Notification System</span>
                                    </p>
                                </td>
                            </tr>
                        </table>

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
            // 2. Auto-Reply (To User - V2 Developer Edition)
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
