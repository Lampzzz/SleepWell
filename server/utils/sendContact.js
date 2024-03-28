import nodemailer from "nodemailer";

const sendContact = async ({ fullName, email, phoneNumber, message }) => {
  const transporter = nodemailer.createTransport({
    host: process.env.HOST,
    port: 587,
    auth: {
      user: process.env.USER,
      pass: process.env.PASS,
    },
  });

  const mailOptions = {
    from: email,
    to: "lampazaj@gmail.com",
    subject: "Contact Us",
    text:
      `You have received a message from ${fullName}.\n\n` +
      `Phone Number: ${phoneNumber}.\n` +
      `Message:\n${message}`,
  };

  await transporter.sendMail(mailOptions);
};

export default sendContact;
