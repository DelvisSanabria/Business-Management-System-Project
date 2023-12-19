import nodemailer from "nodemailer";
const emailRouter = require("express").Router();

const contraseñaparanodemailer = "bvzf otiz jnbo zybt"

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "delvissivira9@gmail.com",
    pass: "bvzf otiz jnbo zybt",
  },
});

emailRouter.post("/", async (req, res) => {

  const { email, subject, message } = req.body

  const info = await transporter.sendMail({
    from: 'delvissivira9@gmail.com',
    to: email,
    subject: subject,
    html: message,
  });

  transporter.sendMail(info, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send('a error has occurred.');
    } else {
      res.status(200).send('email send successfully');
    }
  });
})

