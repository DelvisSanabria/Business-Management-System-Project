const express = require("express"); 
const app = express();
const port = 3001; 
const mongoose = require("mongoose"); 
const cors = require("cors");

try {
  mongoose.connect("mongodb://127.0.0.1:27017/nodeJsProyect");
} catch (error) {
  console.log(error);
}

const corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));


app.use(express.json());