// src/components/RecipeList.jsx (updated for client-side pagination)

import React from "react";
import { Link } from "react-router-dom";

const RecipeList = ({ recipes, currentPage, totalPages, onPageChange }) => {
  if (!recipes || recipes.length === 0) {
    return <p>No recipes found. Try a different search!</p>;
  }

  return (
    <div className="recipe-list-container">
      <h2>Search Results</h2>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe._id}>
            <Link to={`/recipe/${recipe._id}`}>
              <h3>{recipe.name}</h3>
            </Link>
          </li>
        ))}
      </ul>
      <div className="pagination-controls">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default RecipeList;
