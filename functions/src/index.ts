import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as nodemailer from 'nodemailer';
import { generateVerificationCode, isValidVerificationCode } from './verificationUtils';

admin.initializeApp();

const transporter = nodemailer.createTransport({
  // Configure your email service here
});

export const sendVerificationEmail = functions.https.onCall(async (data, context) => {
  const { email } = data;
  if (!email) {
    throw new functions.https.HttpsError('invalid-argument', 'Email is required');
  }

  const verificationCode = generateVerificationCode();
  
  // Store the verification code in Firestore
  await admin.firestore().collection('verificationCodes').add({
    email,
    code: verificationCode,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  });

  // Send email
  const mailOptions = {
    from: 'Your Company <noreply@yourcompany.com>',
    to: email,
    subject: 'Verify Your Email',
    text: `Your verification code is: ${verificationCode}`,
  };

  await transporter.sendMail(mailOptions);

  return { success: true };
});

export const verifyEmail = functions.https.onCall(async (data, context) => {
  const { code } = data;
  if (!code || !isValidVerificationCode(code)) {