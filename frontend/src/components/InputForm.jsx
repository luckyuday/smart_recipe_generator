import React, { useState } from "react";

const InputForm = ({ onSearch }) => {
  const [ingredients, setIngredients] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [dietaryTags, setDietaryTags] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();

    const searchQuery = {
      ingredients,
      difficulty,
      dietary_tags: dietaryTags,
    };

    onSearch(searchQuery);
  };

  return (
    <form onSubmit={handleSearch}>
      <div>
        <label>Ingredients:</label>
        <input
          type="text"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          placeholder="e.g., apple, flour"
        />
      </div>

      <div>
        <label>Difficulty:</label>
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value="">Any</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
      </div>

      <div>
        <label>Dietary Preferences:</label>
        <select
          value={dietaryTags}
          onChange={(e) => setDietaryTags(e.target.value)}
        >
          <option value="">Any</option>
          <option value="Vegetarian">Vegetarian</option>
          <option value="Gluten-Free">Gluten-Free</option>
        </select>
      </div>

      <button type="submit">Search Recipes</button>
    </form>
  );
};

export default InputForm;
