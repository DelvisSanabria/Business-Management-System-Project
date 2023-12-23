const express = require("express"); 
const app = express();
const mongoose = require("mongoose"); 
const cors = require("cors");
const userRouter = require("./Routes/Users");
const productRouter = require("./Routes/Products");
const saleRouter = require("./Routes/Sales");
const reportRouter = require("./Controllers/Reports");
/* const mailRouter = require("./Models/EmailSender"); */
const corsOptions = {
  origin: "*",
};


//conexión a la base de datos
try {
  mongoose.connect("mongodb://127.0.0.1:27017/businessDatabase");
} catch (error) {
  console.log(error);
}


//ajustes
app.set('port',process.env.PORT || 3001);


//middlewares
app.use(express.json());
app.use("/images", express.static("images"));
app.use(cors(corsOptions));
app.use("/users", userRouter);
app.use("/products", productRouter);
app.use("/sales", saleRouter);
app.use("/reports", reportRouter);
/* app.use("/mailsender", mailRouter); */


//puerto
app.listen(app.get('port'), () => {
  console.log('server on port', app.get('port'));
})