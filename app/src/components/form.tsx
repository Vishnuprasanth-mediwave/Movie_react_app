import React, { useState } from "react";
import { IMovieAdd } from "./types";

interface IForm {
  handleAddMovie: (movie: IMovieAdd) => void;
  cancelModal?: () => void;
  emptyMovie: IMovieAdd;
  type?: string;
}

const Form: React.FC<IForm> = ({
  handleAddMovie,
  cancelModal,
  emptyMovie,
  type,
}) => {
  const [movie, setMovie] = useState({
    title: emptyMovie.title,
    year: emptyMovie.year,
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setMovie({ ...movie, [name]: value });
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    handleAddMovie(movie);
  }

  function handleCancelClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (cancelModal) {
      cancelModal();
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">
        Title
        <input
          type="text"
          id="title"
          name="title"
          value={movie.title}
          placeholder="Title"
          onChange={handleChange}
          required
        />
      </label>

      <label htmlFor="year">
        Year
        <input
          type="number"
          id="year"
          name="year"
          value={movie.year}
          placeholder="Year"
          onChange={handleChange}
          required
        />
      </label>

      {type === "edit" ? (
        <>
          <button type="submit">Save</button>
          <button onClick={handleCancelClick}>Cancel</button>
        </>
      ) : (
        <>
          <button type="submit">Add Movie</button>
        </>
      )}
    </form>
  );
};

export default Form;
