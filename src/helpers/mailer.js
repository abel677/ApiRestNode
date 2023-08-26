import nodemailer from "nodemailer";
import { ClientError } from "../utils/responseApi.js";
import { EMAIL_SECRET } from "../config/config.js";

const createTrans = () => {
  const transport = nodemailer.createTransport({
    host: "smtp.sendgrid.net",
    port: 587,
    tls: {
      rejectUnauthorized: false,
    },
    auth: {
      user: "apikey",
      pass: EMAIL_SECRET,
    },
  });
  return transport;
};

const sendEmail = async (email, user, token) => {
  try {
    const transporter = createTrans();
    const info = await transporter.sendMail({
      from: "jabel.system@gmail.com",
      to: email,
      subject: "Confirma tu cuenta en Abel App",
      html: `
        <h1>Hola ${user} </h1>
        <p>Para verificar tu cuenta ingresa en el siguiente enlace: </p>
        <a href="http://localhost:5000/api/auth/confirm/${token}"><b>Click aquí</b></a>
      `,
    });

    return;
  } catch (error) {
    return new ClientError(error.message, error.status)
  }
};

export const mailer = { sendEmail };
