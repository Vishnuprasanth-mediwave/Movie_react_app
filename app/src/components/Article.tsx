// Article.tsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IMovie } from "../components/types";
import LoadingIcon from "./Loading/LoadingIcon";

interface ArticleProps {
  movie: IMovie;
  handleEdit: (movie: IMovie) => void;
  handleDelete: (id: number) => void;
}

const Article: React.FC<ArticleProps> = ({
  movie,
  handleEdit,
  handleDelete,
}) => {
  const [load, setLoad] = useState(false);
  function handle(id: number) {
    handleDelete(id);
    setLoad(true);
  }
  return (
    <article>
      <h1>{movie.title}</h1>
      <h3>{movie.year}</h3>
      <div className="grid">
        <Link to={`/edit/${movie.id}`}>
          <button onClick={() => handleEdit(movie)}>Edit</button>
        </Link>
        <button onClick={() => handle(movie.id)} disabled={load}>
          {load ? <LoadingIcon /> : "Delete"}
        </button>
      </div>
    </article>
  );
};

export default Article;
