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
        const timestamp = new Date().toISOString().replace('T', ' ').substr(0, 19);

        // Ultimate Developer Email Template
        const userHtml = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Wassidev Notification</title>
        </head>
        <body style="margin: 0; padding: 0; background-color: #000000; font-family: 'Consolas', 'Monaco', 'Courier New', monospace; -webkit-font-smoothing: antialiased;">
            
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #000000; width: 100%; text-align: center;">
                <tr>
                    <td align="center" style="padding: 20px 10px;">
                        
                        <!-- Gradient Border Wrapper -->
                        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width: 600px; background: linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #06b6d4 100%); border-radius: 2px; padding: 1px;">
                            <tr>
                                <td>
                                    <!-- Inner Black Card -->
                                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #050505; border-radius: 1px;">
                                        
                                        <!-- Terminal Header -->
                                        <tr>
                                            <td style="padding: 15px 20px; border-bottom: 1px solid #1f1f1f; background-color: #0a0a0a;">
                                                <table width="100%">
                                                    <tr>
                                                        <td align="left">
                                                            <span style="display: inline-block; width: 10px; height: 10px; background: #ef4444; border-radius: 50%; margin-right: 6px;"></span>
                                                            <span style="display: inline-block; width: 10px; height: 10px; background: #eab308; border-radius: 50%; margin-right: 6px;"></span>
                                                            <span style="display: inline-block; width: 10px; height: 10px; background: #22c55e; border-radius: 50%;"></span>
                                                        </td>
                                                        <td align="right" style="color: #52525b; font-size: 10px; font-family: monospace;">bash --login</td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>

                                        <!-- Content -->
                                        <tr>
                                            <td style="padding: 40px 30px;">
                                                <!-- Logo -->
                                                <div style="margin-bottom: 30px; text-align: left;">
                                                    <span style="color: #6366f1; font-weight: bold;">></span> <span style="color: #ffffff; font-weight: bold; font-size: 20px;">Wassidev.init()</span><span style="animation: blink 1s infinite; color: #6366f1;">_</span>
                                                </div>

                                                ${isFr ? `
                                                    <!-- Status Badge -->
                                                    <div style="margin-bottom: 20px;">
                                                        <span style="background: rgba(34, 197, 94, 0.1); border: 1px solid rgba(34, 197, 94, 0.2); color: #22c55e; padding: 4px 10px; border-radius: 4px; font-size: 10px; font-weight: bold; letter-spacing: 1px;">STATUS: REÇU 200 OK</span>
                                                    </div>

                                                    <p style="color: #d4d4d8; font-size: 14px; line-height: 1.8; margin-bottom: 20px;">
                                                        <span style="color: #6366f1;">const</span> visitor = <span style="color: #22c55e;">"${firstName}"</span>;<br>
                                                        <span style="color: #6366f1;">console</span>.log(<span style="color: #eab308;">"Message bien transmis au serveur central."</span>);
                                                    </p>

                                                    <div style="background: #0f0f0f; border: 1px solid #27272a; border-radius: 8px; padding: 20px; margin-bottom: 30px;">
                                                        <p style="margin: 0; color: #a1a1aa; font-size: 12px; font-family: monospace;">
                                                            // Ticket Details<br>
                                                            ID: <span style="color: #ffffff;">${ticketId}</span><br>
                                                            Time: <span style="color: #ffffff;">${timestamp}</span><br>
                                                            Response-Time: <span style="color: #ffffff;">~24h</span>
                                                        </p>
                                                    </div>

                                                    <table role="presentation" border="0" cellspacing="0" cellpadding="0" style="width: 100%;">
                                                        <tr>
                                                            <td align="left">
                                                                <a href="https://wassidev.fr" style="display: inline-block; padding: 12px 28px; background: #ffffff; color: #000000; text-decoration: none; font-weight: bold; font-size: 12px; text-transform: uppercase; border-radius: 2px; letter-spacing: 1px;">Retour au terminal</a>
                                                            </td>
                                                        </tr>
                                                    </table>

                                                ` : `
                                                    <!-- Status Badge -->
                                                    <div style="margin-bottom: 20px;">
                                                        <span style="background: rgba(34, 197, 94, 0.1); border: 1px solid rgba(34, 197, 94, 0.2); color: #22c55e; padding: 4px 10px; border-radius: 4px; font-size: 10px; font-weight: bold; letter-spacing: 1px;">STATUS: RECEIVED 200 OK</span>
                                                    </div>

                                                    <p style="color: #d4d4d8; font-size: 14px; line-height: 1.8; margin-bottom: 20px;">
                                                        <span style="color: #6366f1;">const</span> visitor = <span style="color: #22c55e;">"${firstName}"</span>;<br>
                                                        <span style="color: #6366f1;">console</span>.log(<span style="color: #eab308;">"Message successfully transmitted to core server."</span>);
                                                    </p>

                                                    <div style="background: #0f0f0f; border: 1px solid #27272a; border-radius: 8px; padding: 20px; margin-bottom: 30px;">
                                                        <p style="margin: 0; color: #a1a1aa; font-size: 12px; font-family: monospace;">
                                                            // Ticket Details<br>
                                                            ID: <span style="color: #ffffff;">${ticketId}</span><br>
                                                            Time: <span style="color: #ffffff;">${timestamp}</span><br>
                                                            Response-Time: <span style="color: #ffffff;">~24h</span>
                                                        </p>
                                                    </div>

                                                    <table role="presentation" border="0" cellspacing="0" cellpadding="0" style="width: 100%;">
                                                        <tr>
                                                            <td align="left">
                                                                <a href="https://wassidev.fr" style="display: inline-block; padding: 12px 28px; background: #ffffff; color: #000000; text-decoration: none; font-weight: bold; font-size: 12px; text-transform: uppercase; border-radius: 2px; letter-spacing: 1px;">Return to Terminal</a>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                `}
                                            </td>
                                        </tr>

                                        <!-- Footer -->
                                        <tr>
                                            <td style="background-color: #0a0a0a; padding: 20px 30px; border-top: 1px solid #1f1f1f;">
                                                <table width="100%">
                                                    <tr>
                                                        <td align="left">
                                                            <p style="color: #52525b; font-size: 10px; margin: 0; font-family: monospace;">
                                                                &copy; ${new Date().getFullYear()} Wassim Maataoui<br>
                                                                France
                                                            </p>
                                                        </td>
                                                        <td align="right">
                                                            <p style="color: #52525b; font-size: 10px; margin: 0; font-family: monospace;">
                                                                SECURED CONNECTION<br>
                                                                <span style="color: #22c55e;">●</span> ENCRYPTED
                                                            </p>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
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
