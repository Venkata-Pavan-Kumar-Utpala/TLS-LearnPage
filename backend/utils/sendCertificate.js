import nodemailer from 'nodemailer';

export const sendCertificate = async ({ name, email, courseName, xp, buffer }) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"TechLearn Solutions" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: `Certificate for ${courseName}`,
    html: `
      <h2>Hi ${name},</h2>
      <p>You have successfully completed the course <strong>${courseName}</strong> with <strong>${xp} XP</strong>.</p>
      <p>Your certificate is attached and also available on the cloud.</p>
    `,
    attachments: [
      {
        filename: `${courseName}-${name}.pdf`,
        content: buffer,
        contentType: 'application/pdf',
      },
    ],
  };

  await transporter.sendMail(mailOptions);
};
