import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(
          `https://smart-recipe-generator-j3z0.onrender.com/api/recipes/${id}` // <-- Corrected port
        );
        setRecipe(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchRecipe();
    }
  }, [id]);

  const handleRating = async (rating) => {
    try {
      await axios.post(
        `https://smart-recipe-generator-j3z0.onrender.com/api/recipes/${id}/rate`,
        {
          rating,
        }
      ); // <-- Corrected port
      alert("Thank you for your feedback!");
    } catch (err) {
      console.error("Rating submission failed:", err);
      alert("Failed to submit rating. Please try again.");
    }
  };

  if (loading) return <div>Loading recipe details...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!recipe) return <div>No recipe selected.</div>;

  return (
    <div className="recipe-detail-container">
      {recipe.img_src && (
        <img src={recipe.img_src} alt={recipe.name} className="recipe-image" />
      )}

      <h2 className="recipe-title">{recipe.name}</h2>

      <div className="recipe-summary">
        {recipe.cooking_time && (
          <div className="quick-details">
            <p>
              <strong>Prep Time:</strong> {recipe.cooking_time.prep}
            </p>
            <p>
              <strong>Cook Time:</strong> {recipe.cooking_time.cook}
            </p>
            <p>
              <strong>Total Time:</strong> {recipe.cooking_time.total}
            </p>
          </div>
        )}
        <p>
          <strong>Cuisine:</strong>
          {recipe.cuisine
            .split("/")
            .filter(Boolean)
            .map((category, index) => (
              <span key={index} className="cuisine-tag">
                {category.trim()}
              </span>
            ))}
        </p>
        <p>
          <strong>Difficulty:</strong> {recipe.difficulty}
        </p>
      </div>

      <div className="feedback-section">
        <h3>Rate this recipe:</h3>
        <div className="rating-buttons">
          <button onClick={() => handleRating(1)}>1</button>
          <button onClick={() => handleRating(2)}>2</button>
          <button onClick={() => handleRating(3)}>3</button>
          <button onClick={() => handleRating(4)}>4</button>
          <button onClick={() => handleRating(5)}>5</button>
        </div>
      </div>

      <div className="recipe-main-content">
        <div className="ingredients-section">
          <h3>Ingredients</h3>
          <ul>
            {recipe.ingredients[0].split("|").map((ingredient, index) => (
              <li key={index}>{ingredient.trim()}</li>
            ))}
          </ul>
        </div>

        <div className="directions-section">
          <h3>Directions</h3>
          <ol>
            {recipe.directions
              .split(".")
              .filter((step) => step.trim() !== "")
              .map((step, index) => (
                <li key={index}>{step.trim()}.</li>
              ))}
          </ol>
        </div>

        <div className="nutrition-section">
          <h3>Nutritional Information</h3>
          <ul>
            {recipe.nutrition
              .split(",")
              .filter((item) => item.trim() !== "")
              .map((item, index) => (
                <li key={index}>{item.trim()}</li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
