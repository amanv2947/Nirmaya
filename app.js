require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const https = require("https");
const request = require('request');


//bodyparser
app.use(express.urlencoded({extended: true}));

//ejs environment
let ejs = require('ejs');
app.set('view engine', 'ejs');
app.use(express.static("public"));

//My routes (imports)
const htmlRoutes = require("./routes/html-routes");
const authRoutes = require("./routes/auth");
const bmiRoutes = require("./routes/bmi");
const calorieRoutes = require("./routes/calorieApi");


//DB Connection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("DB CONNECTED");
  });

//Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//My Routes
app.use("/api", htmlRoutes);
app.use("/api", authRoutes);
app.use("/api", bmiRoutes);
app.use("/api",calorieRoutes );
//PORT
const port = process.env.PORT || 8000;

//Starting a server
app.listen(port, () => {
  console.log(`App is running at ${port}`);
});
