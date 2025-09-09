import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const TopRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopRecipes = async () => {
      try {
        const response = await axios.get(
          "https://smart-recipe-generator-j3z0.onrender.com/api/recipes/top-rated"
        );
        setRecipes(response.data);
      } catch (err) {
        setError("Failed to fetch top-rated recipes.");
      } finally {
        setLoading(false);
      }
    };

    fetchTopRecipes();
  }, []);

  if (loading) return <div>Loading top recipes...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="top-recipes-container recipe-list-container">
      <h2>Top-Rated Recipes</h2>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe._id}>
            <Link to={`/recipe/${recipe._id}`}>
              <h3>{recipe.name}</h3>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopRecipes;
