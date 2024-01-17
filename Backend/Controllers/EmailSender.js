const nodemailer = require("nodemailer");
const emailRouter = require("express").Router();

const contraseñaparanodemailer = "bvzf otiz jnbo zybt"


const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "proyectopolar2024@gmail.com",
    pass: "jlzg aqmj mmce zbvu"
  }
});

function randomNumber() {
  return Math.random().toString().substring(2, 5) + Math.random().toString().substring(2, 5);
}

let key = randomNumber();

emailRouter.post("/", async (req, res) => {

  const { email } = req.body;

  const mail = {
    from: "proyectopolar2024@gmail.com",
    to: email,
    subject: "Recuperar contraseña",
    text: key,
  };

  transporter.sendMail(mail, (error, info) => {
    if (error) {
      console.log(error);
      return res.status(500).send("Ha ocurrido un error con el nombre: " + error);
    } else {
      res.status(200).json(email);
      setTimeout(() => {
        key = randomNumber();
      }, 60000 * 3);
    }
  });
})

emailRouter.post("/keyValidation", async (req, res) => {
  const { userKey } = req.body
  if (userKey === key) {
    return res.status(200).send("Clave correcta")
  } else {
    return res.status(400).json({userKey: "Clave de recuperación incorrecta"})
  }
})

module.exports = emailRouter;

