import nodemailer from "nodemailer";

const createTrans = () => {
  const transport = nodemailer.createTransport({
    host: "smtp.sendgrid.net",
    port: 587,
    tls: {
      rejectUnauthorized: false,
    },
    auth: {
      user: "apikey",
      pass: "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",
    },
  });
  return transport;
};

const sendEmail = async (email, user, token) => {
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
};

export const mailer = { sendEmail };
