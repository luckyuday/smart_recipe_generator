const mongoose = require("mongoose");

const cookingTimeSchema = new mongoose.Schema(
  {
    prep: String,
    cook: String,
    total: String,
  },
  { _id: false }
);

const recipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  ingredients: {
    type: [String],
    required: true,
  },
  directions: {
    type: String,
    required: true,
  },
  cooking_time: cookingTimeSchema,
  cuisine: String,
  difficulty: String,
  dietary_tags: [String],
  rating: Number,
  nutrition: String,
});

const recipeModel = mongoose.model("Recipe", recipeSchema);

module.exports = recipeModel;
