import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';
import { rateLimit } from 'express-rate-limit'; // New Import

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// --- RATE LIMITER CONFIGURATION ---
// Limit each IP to 5 requests per 15 minutes
const contactLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 5,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: 'Too many requests from this IP, please try again after 15 minutes.' }
});

// Transporter Configuration
const transporter = nodemailer.createTransport({
    host: 'smtp.ionos.fr',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Verify connection configuration
transporter.verify(function (error, success) {
    if (error) {
        console.log('SMTP Connection Error:', error);
    } else {
        console.log("Server is ready to take our messages");
    }
});

// Email Sending Endpoint with Rate Limit
app.post('/api/contact', contactLimiter, async (req, res) => {
    const { firstName, lastName, email, phone, message, turnstileToken } = req.body;

    // Capture IP
    const userIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

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
                remoteip: userIp
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

    const fullName = `${firstName} ${lastName}`;

    const mailOptions = {
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
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ success: 'Message sent successfully!' });
    } catch (error) {
        console.error('Email Send Error:', error);
        res.status(500).json({ error: 'Failed to send message.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
