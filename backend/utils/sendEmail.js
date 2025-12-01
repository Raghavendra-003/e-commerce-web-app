import nodemailer from 'nodemailer';

export const sendOrderEmail = async ({ to, subject, html }) => {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.FROM_EMAIL || 'no-reply@example.com';

  if (!host || !user || !pass) {
    console.log('Email not configured. Logging email content instead:\n', { to, subject, html });
    return { mocked: true };
  }

  const transporter = nodemailer.createTransport({
    host, port, secure: false,
    auth: { user, pass }
  });

  const info = await transporter.sendMail({ from, to, subject, html });
  return info;
};