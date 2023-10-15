const express = require("express");
const app = express();
const router = express.Router();
require("dotenv").config();
const cors = require("cors");
const corsOptions = require("./config/corsOption");
const cookieParser = require("cookie-parser");
const port = process.env.PORT || 5000;
const mongoose = require("mongoose");
const connect = require("./config/connect");
const authRoute = require("./route/auth");
const userRoute = require("./route/user");

app.use(cors(corsOptions));
connect();
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("This is the API server for the phishing site");
});

router.use(authRoute);
router.use(userRoute);

app.use("/api", router);

app.use("*", (req, res) => {
  return res.send("Endpoint Not found");
});

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDb");
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
});
