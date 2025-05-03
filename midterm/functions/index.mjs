import { onDocumentCreated } from 'firebase-functions/v2/firestore';
import { onCall } from 'firebase-functions/v2/https';
import admin from 'firebase-admin';
import nodemailer from 'nodemailer';

if (!admin.apps.length) {
  admin.initializeApp();
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'huyd37448@gmail.com',
    pass: 'dwxr hpop lkke ekto',
  },
});

export const sendWelcomeEmail = onDocumentCreated('users/{userId}', async (event) => {
  const userData = event.data?.data();
  if (!userData) {
    console.error('No data associated with the event');
    return;
  }

  const email = userData.email;
  const name = userData.name || 'User';

  const mailOptions = {
    from: 'Your App <your-email@gmail.com>',
    to: email,
    subject: 'Welcome to Our App!',
    html: `
      <h1>Welcome, ${name}!</h1>
      <p>Thank you for joining our app. We're excited to have you!</p>
      <p>Your account details:</p>
      <ul>
        <li>Email: ${email}</li>
        <li>Phone: ${userData.phone || 'Not provided'}</li>
        <li>Address: ${userData.address || 'Not provided'}</li>
      </ul>
      <p>Best regards,<br>Your App Team</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Welcome email sent to ${email}`);
  } catch (error) {
    console.error('Error sending email:', error);
  }
});



export const sendLoginNotification = onCall(async (request) => {
  if (!request.auth) {
    throw new HttpsError('unauthenticated', 'You must be logged in to receive notifications.');
  }

  const email = request.data.email;
  if (!email) {
    throw new HttpsError('invalid-argument', 'Email is required.');
  }

  const timestamp = request.data.timestamp || new Date().toLocaleString();

  const mailOptions = {
    from: 'Your App <huyd37448@gmail.com>',
    to: email,
    subject: 'New Login to Your Account',
    html: `
      <h1>New Login Detected</h1>
      <p>We noticed a new login to your account.</p>
      <p><strong>Time:</strong> ${timestamp}</p>
      <p>If this was you, no action is needed. If not, please secure your account immediately.</p>
      <p>Best regards,<br>Your App Team</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Login notification sent to ${email}`);
    return { success: true, message: 'Login notification sent successfully.' };
  } catch (error) {
    console.error('Error sending login notification:', error);
    throw new HttpsError('internal', 'Failed to send login notification.');
  }
});
