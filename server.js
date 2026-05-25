import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Enable CORS
app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json());

// Check for required environment variables
if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  console.warn("WARNING: EMAIL_USER and EMAIL_PASS are not defined in the environment variables!");
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Backend is running' });
});

// Contact endpoint
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  // Basic validation
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, error: 'Please fill in all fields (name, email, message).' });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.verify();

    const mailOptions = {
      from: `"${name}" <${process.env.EMAIL_USER}>`, 
      to: process.env.EMAIL_USER, 
      replyTo: email, 
      subject: `Portfolio Contact: Message from ${name}`,
      text: `You have received a new contact submission from your portfolio website.\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <h2 style="color: #d97743; border-bottom: 2px solid #d97743; padding-bottom: 10px;">New Contact Message</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <div style="margin-top: 20px; padding: 15px; background: #fdfbf7; border-left: 4px solid #d97743; border-radius: 4px;">
            <p style="margin: 0; white-space: pre-wrap; color: #2d241e;">${message}</p>
          </div>
          <hr style="margin-top: 30px; border: 0; border-top: 1px solid #e0e0e0;" />
          <p style="font-size: 12px; color: #888888; text-align: center;">Sent from your Portfolio Website Contact Form</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Nodemailer Error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to send email. Please try again later.',
      details: error.message 
    });
  }
});

const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

server.on('error', (err) => {
  console.error('\n❌ Server failed to start:', err);
});
