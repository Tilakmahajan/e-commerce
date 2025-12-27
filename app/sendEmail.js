import nodemailer from "nodemailer";

export async function sendEmail({ to, subject, text, html }) {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const info = await transporter.sendMail({
    from: `"My E-Commerce Store" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text,
    html,
  });

  return info;
}
