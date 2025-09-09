const express = require("express");
const router = express.Router();

const {
  fetchRecipes,
  getRecipeById,
  changeRating,
  getTopRated,
} = require("../controllers/recipes.controller");

router.get("/", fetchRecipes);
router.get("/top-rated", getTopRated);
router.get("/:id", getRecipeById);
router.post("/:id/rate", changeRating);

module.exports = router;
