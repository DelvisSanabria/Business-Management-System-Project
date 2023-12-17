const express = require("express"); 
const app = express();
const mongoose = require("mongoose"); 
const cors = require("cors");


try {
  mongoose.connect("mongodb://127.0.0.1:27017/businessDatabase");
} catch (error) {
  console.log(error);
}

app.set('port',process.env.PORT || 3001);

const corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));


app.use(express.json());

const userRouter = require("./Routes/Users");

app.use("/users", userRouter); 

const reportRouter = require("./Controllers/Reports");

app.use("/reports", reportRouter);

app.listen(app.get('port'), () => {
  console.log('server on port', app.get('port'));
})