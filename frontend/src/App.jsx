import { useState } from "react";
import axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import InputForm from "./components/InputForm";
import RecipeList from "./components/RecipeList";
import RecipeDetail from "./components/RecipeDetail";
import TopRecipes from "./components/TopRecipes";
import "./App.css";

function App() {
  const [allRecipes, setAllRecipes] = useState([]); // <-- New state for all recipes
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 12;

  const handleSearch = async (query) => {
    setLoading(true);
    setError(null);
    setAllRecipes([]);
    setCurrentPage(1); // Reset to page 1 on new search

    try {
      const params = new URLSearchParams(query).toString();
      const response = await axios.get(
        `https://smart-recipe-generator-j3z0.onrender.com/api/recipes?${params}`
      );

      setAllRecipes(response.data);
    } catch (err) {
      console.error("API Error:", err);
      setError("Failed to fetch recipes. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(allRecipes.length / recipesPerPage);
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = allRecipes.slice(
    indexOfFirstRecipe,
    indexOfLastRecipe
  );

  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <h1>Smart Recipe Generator</h1>
        </header>
        <main>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <InputForm onSearch={handleSearch} />
                  {loading && <p>Loading recipes...</p>}
                  {error && <p className="error-message">{error}</p>}
                  {!loading && !error && allRecipes.length > 0 && (
                    <RecipeList
                      recipes={currentRecipes}
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
                    />
                  )}
                  {!loading && !error && allRecipes.length === 0 && (
                    <TopRecipes />
                  )}
                </>
              }
            />
            <Route path="/recipe/:id" element={<RecipeDetail />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
