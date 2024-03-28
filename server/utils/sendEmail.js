import nodemailer from "nodemailer";

const sendEmail = async (email, subject, text) => {
  const transporter = nodemailer.createTransport({
    host: process.env.HOST,
    port: 587,
    auth: {
      user: process.env.USER,
      pass: process.env.PASS,
    },
  });

  const mailOptions = {
    from: process.env.USER,
    to: email,
    subject: subject,
    text: text,
  };

  await transporter.sendMail(mailOptions);
};

export default sendEmail;
