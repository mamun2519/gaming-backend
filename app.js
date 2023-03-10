const express = require("express");
const app = express();
const cors = require("cors");
app.use(
  cors({
    origin: "*",
  })
);
// const cookieParser = require('cookie-parser')....
const fileUpload = require("express-fileupload");
// middelwar
// app.use(cookieParser())
app.use(express.json());

app.use(fileUpload());
app.use(express.static("public"));

// import all router
const userRouter = require("./router/user");
const gameRouter = require("./router/gameRouter");
const resultRouter = require("./router/resultRouter");
const withdrowRouter = require("./router/withdrowRouter");
const reachrgeRouter = require("./router/reachrgeRouter");
const contectRouter = require("./router/contectRouter");
const errorHandeler = require("./utilitis/errorHandeler");
app.use("/api/v1/user", userRouter);
app.use("/api/v1/game", gameRouter);
app.use("/api/v1/result", resultRouter);
app.use("/api/v1/withdrow", withdrowRouter);
app.use("/api/v1/reachrge", reachrgeRouter);
app.use("/api/v1/contect", contectRouter);

// test route
app.use("/", (req, res) => {
  res.send("hellw world");
});

app.use(errorHandeler);

module.exports = app;
