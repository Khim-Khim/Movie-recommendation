import axios from "axios";
import React, { useState } from "react";
import SearchBar from "./SearchBar";
import MovieList from "./MovieList";
import "./styles.css";

const App = () => {
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (searchTerm) => {
    try {
      const response_module = []; // kết quả trả về từ module

      const promises = response_module.map(async (value) => {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/movie?api_key=731dd3df9051a276486f33b31d3a5b1c&query=${value}`
        );

        return response.data.results[0];
      });

      const results = await Promise.all(promises);

      const movies = results
        .filter((movie) => movie) // Loại bỏ kết quả null hoặc undefined
        .map((movie) => ({
          id: movie.id,
          title: movie.title,
          image: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
        }));

      setSearchResults(movies);
    } catch (error) {
      console.error("Error searching for movies:", error);
    }
  };

  return (
    <div className="container">
      <h1>Netflix Recommendation</h1>
      <SearchBar onSearch={handleSearch} />
      <MovieList movies={searchResults} />
    </div>
  );
};

export default App;
