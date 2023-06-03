import React from "react";

const MovieCard = ({ movie }) => {
  return (
    <div className="card">
      <img src={movie.image} alt={movie.title} />
      <h3>{movie.title}</h3>
    </div>
  );
};

export default MovieCard;
