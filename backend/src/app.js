const express = require("express");
const app = express();
const cors = require("cors");
const recipeRouter = require("./routes/recipes.route");
app.use(cors());
app.use(express.json());
app.use("/api/recipes", recipeRouter);

module.exports = app;
