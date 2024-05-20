const express = require("express");
const dotEnv = require('dotenv');
const {authRouter, usersRouter, plansRouter} = require("./routes");

const dbConnect = require("./db/db.connect");

dotEnv.config();
const app = express();
const port = process.env.SERVER_PORT;

dbConnect();

app.get("/", (req, res) => {
  res.send("App is running...");
});

//Adding routes
app.use("/auth", authRouter);
app.use("/users", usersRouter);
app.use("/plans", plansRouter);

app.listen(port, () => {
  console.log(`Daily-planner-app listening on port ${port}`);
});
