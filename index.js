const express = require('express')
const authRouter = require('./routes/auth.router')
const dbConnect = require("./db/db.connect");

const app = express()
const port = 3000

dbConnect()

app.get('/', (req, res) => {
  res.send('App is running...')
});

//Adding routes
app.use("/auth", authRouter);

app.listen(port, () => {
  console.log(`Daily-planner-app listening on port ${port}`)
})