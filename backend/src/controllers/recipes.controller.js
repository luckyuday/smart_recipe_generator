const recipeModel = require("../db/models/recipes.model");

async function fetchRecipes(req, res) {
  try {
    const { ingredients, difficulty, cooking_time_max, dietary_tags } =
      req.query;
    let query = {};

    if (ingredients) {
      const ingredientList = ingredients
        .split(",")
        .map((i) => new RegExp(i.trim(), "i"));
      query.ingredients = { $in: ingredientList };
    }

    if (difficulty) {
      query.difficulty = difficulty;
    }

    if (cooking_time_max) {
      query["cooking_time.total"] = { $lte: cooking_time_max };
    }

    if (dietary_tags) {
      const tagsList = dietary_tags
        .split(",")
        .map((t) => new RegExp(t.trim(), "i"));
      query.dietary_tags = { $in: tagsList };
    }

    const recipes = await recipeModel.find(query);
    res.json(recipes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
}

async function getRecipeById(req, res) {
  try {
    const recipe = await recipeModel.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ msg: "Recipe not found" });
    }
    res.json(recipe);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
}

async function changeRating(req, res) {
  try {
    const { rating } = req.body;
    console.log(req.params, rating);
    if (rating === undefined || rating < 1 || rating > 5) {
      return res
        .status(400)
        .json({ msg: "Rating must be a number between 1 and 5" });
    }

    const recipe = await recipeModel.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ msg: "Recipe not found" });
    }

    // A simple approach is to update the rating field directly.
    // A more advanced approach would be to store an array of ratings and calculate the average.
    // We'll update it directly for now.
    recipe.rating = rating;
    await recipe.save();

    res.json({ msg: "Rating submitted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
}

// Add this new function to your existing recipes.controller.js file

getTopRated = async (req, res) => {
  try {
    const topRecipes = await recipeModel
      .find({
        // Filter to ensure rating is a valid number, not null or undefined
        rating: { $exists: true, $type: "number" },
      })
      .sort({ rating: -1 })
      .limit(10);

    res.json(topRecipes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

module.exports = { fetchRecipes, getRecipeById, changeRating, getTopRated };
