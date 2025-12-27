const nodemailer = require('nodemailer');

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    },
    tls: {
      rejectUnauthorized: false
    }
  });
};

// Welcome email template
const getWelcomeEmailTemplate = (userName, userEmail) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          font-family: 'Arial', sans-serif;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          margin: 0;
          padding: 20px;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          background: white;
          border-radius: 15px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        }
        .header {
          background: linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%);
          padding: 40px 20px;
          text-align: center;
          color: white;
        }
        .header h1 {
          margin: 0;
          font-size: 32px;
          font-weight: bold;
        }
        .content {
          padding: 40px 30px;
        }
        .welcome-text {
          font-size: 24px;
          color: #0ea5e9;
          margin-bottom: 20px;
          font-weight: bold;
        }
        .message {
          font-size: 16px;
          line-height: 1.6;
          color: #333;
          margin-bottom: 20px;
        }
        .highlight {
          background: linear-gradient(135deg, #f97316 0%, #0ea5e9 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-weight: bold;
        }
        .info-box {
          background: #f0f9ff;
          border-left: 4px solid #0ea5e9;
          padding: 15px;
          margin: 20px 0;
          border-radius: 5px;
        }
        .info-box h3 {
          color: #0ea5e9;
          margin: 0 0 10px 0;
          font-size: 18px;
        }
        .info-box ul {
          margin: 10px 0;
          padding-left: 20px;
        }
        .info-box li {
          margin: 8px 0;
          color: #555;
        }
        .footer {
          background: #f8fafc;
          padding: 30px;
          text-align: center;
          border-top: 2px solid #e2e8f0;
        }
        .footer p {
          color: #64748b;
          font-size: 14px;
          margin: 5px 0;
        }
        .social-links {
          margin: 15px 0;
        }
        .social-links a {
          color: #0ea5e9;
          text-decoration: none;
          margin: 0 10px;
          font-weight: 600;
        }
        .button {
          display: inline-block;
          background: linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%);
          color: white;
          padding: 12px 30px;
          text-decoration: none;
          border-radius: 25px;
          font-weight: bold;
          margin: 20px 0;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎉 Welcome to DaKshaa T25! 🎉</h1>
        </div>
        
        <div class="content">
          <p class="welcome-text">Hello ${userName}! 👋</p>
          
          <p class="message">
            Congratulations! You have successfully registered for <span class="highlight">DaKshaa T25</span>, 
            the National Level Techno-Cultural Fest that promises to be an unforgettable experience!
          </p>
          
          <div class="info-box">
            <h3>📧 Your Registration Details:</h3>
            <ul>
              <li><strong>Name:</strong> ${userName}</li>
              <li><strong>Email:</strong> ${userEmail}</li>
              <li><strong>Status:</strong> ✅ Successfully Registered</li>
            </ul>
          </div>
          
          <div class="info-box">
            <h3>🎯 What's Next?</h3>
            <ul>
              <li>🎪 <strong>3 Days</strong> of amazing events</li>
              <li>🎓 <strong>20+ Workshops</strong> to enhance your skills</li>
              <li>🏆 <strong>25+ Events</strong> to showcase your talent</li>
              <li>🤝 Network with industry professionals</li>
              <li>🎁 Win exciting prizes and certificates</li>
            </ul>
          </div>
          
          <p class="message">
            <strong>Important:</strong> Keep checking your email for event updates, schedule announcements, 
            and important information about DaKshaa T25.
          </p>
          
          <center>
            <a href="https://your-dakshaa-website.com" class="button">Visit Website</a>
          </center>
        </div>
        
        <div class="footer">
          <p><strong>DaKshaa T25</strong></p>
          <p>National Level Techno-Cultural Fest</p>
          <p style="margin-top: 15px; font-style: italic;">"Where Innovation Meets Excellence"</p>
          
          <div class="social-links">
            <a href="#">Facebook</a> | 
            <a href="#">Instagram</a> | 
            <a href="#">Twitter</a>
          </div>
          
          <p style="margin-top: 20px; font-size: 12px; color: #94a3b8;">
            If you have any questions, please contact us at support@dakshaa.com
          </p>
          <p style="font-size: 12px; color: #94a3b8;">
            © 2025 DaKshaa T25. All rights reserved.
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
};

// Send welcome email
const sendWelcomeEmail = async (userEmail, userName) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: `"DaKshaa T25" <${process.env.EMAIL_USER}>`,
      to: userEmail,
      subject: '🎉 Welcome to DaKshaa T25 - Registration Successful!',
      html: getWelcomeEmailTemplate(userName, userEmail)
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Welcome email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending welcome email:', error);
    return { success: false, error: error.message };
  }
};

module.exports = { sendWelcomeEmail };
