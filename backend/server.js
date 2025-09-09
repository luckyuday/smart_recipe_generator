require("dotenv").config();
const connectDB = require("./src/db/db");
const app = require("./src/app");

connectDB();
app.listen(process.env.PORT, (req, res) => {
  console.log("Server is running");
});
