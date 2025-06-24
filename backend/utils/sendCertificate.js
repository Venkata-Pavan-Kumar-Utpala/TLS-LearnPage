import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,        // Your Gmail address
    pass: process.env.EMAIL_PASS,        // Gmail password 
  },
});

export const sendCertificate = async ({ name, email, courseName, xp }) => {
  const mailOptions = {
    from: `"TechLearn Solutions" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: `🎓 Your Certificate for ${courseName}`,
    html: `
      <h2>Congratulations, ${name}!</h2>
      <p>You've successfully completed the <strong>${courseName}</strong> course and earned <strong>${xp} XP</strong>.</p>
      <p>Your certificate is attached below.</p>
    `,
    attachments: [
      {
        filename: `${courseName}-Certificate.pdf`,
        path: `./certificates/${courseName}-${name}.pdf`, // Generated path
      },
    ],
  };

  await transporter.sendMail(mailOptions);
};