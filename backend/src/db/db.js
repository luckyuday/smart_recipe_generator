const mongoose = require("mongoose");

function connectDB() {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(console.log("Connected to Db successfully."))
    .catch((error) => {
      console.log("Could not connect to db", error);
    });
}

module.exports = connectDB;
