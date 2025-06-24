import nodemailer from "nodemailer";

export const sendPaymentStatusEmail = async ({ user, status }) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587, //for dev we use 587
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
  });

  let mailOptions;
  if (status === "approved") {
    mailOptions = {
      from: `<${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: "Your Certificate is Ready!",
      text: `Congratulations ${user.firstName}, your payment is approved. Certificate attached.`,
    };
  } else {
    mailOptions = {
      from: `<${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: "Certificate Rejected",
      text: `Sorry ${user.firstName}, There were issues with your payment. Please contact support.`,
    };
  }
  await transporter.sendMail(mailOptions);
};

