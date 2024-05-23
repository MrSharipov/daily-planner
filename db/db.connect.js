const mongoose = require("mongoose");

async function dbConnect() {
  try {
    mongoose.connect(process.env.DATABASE_URL);
    console.log(process.env.DATABASE_URL);
    const database = await mongoose.connection;

    database.on("error", (error) => {
      console.error(error);
    });

    database.once("connected", () => {
      console.log("Database Connected");
    });
  } catch (err) {
    console.error(err);
  }
}
module.exports = dbConnect;
