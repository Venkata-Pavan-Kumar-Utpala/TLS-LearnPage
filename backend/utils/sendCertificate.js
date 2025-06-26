import nodemailer from "nodemailer";

export const sendCertificate = async ({ name, email, courseName, xp, buffer }) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

const mailOptions = {
  from: `"TechLearn Solutions" <${process.env.EMAIL_USER}>`,
  to: email,
  subject: "🎓 Your Course Completion Certificate",
  text: `Congratulations ${name}! You have completed the course "${courseName}" and earned ${xp} XP.`,
  html: `
    <h2>Congratulations, ${name}!</h2>
    <p>You've successfully completed the <strong>${courseName}</strong> course and earned <strong>${xp} XP</strong>.</p>
    <p>Your certificate is attached below.</p>
  `,
  attachments: [
    {
      filename: `${courseName}-${name}.pdf`,
      content: buffer,
      contentType: "application/pdf",
    },
  ],
};


  await transporter.sendMail(mailOptions);
};
