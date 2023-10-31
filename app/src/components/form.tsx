import React, { useState } from "react";
import { IMovieAdd } from "./types";
import LoadingIcon from "./Loading/LoadingIcon";

interface IForm {
  handleAddMovie: (movie: IMovieAdd) => void;
  cancelModal?: () => void;
  emptyMovie?: IMovieAdd;
  type?: string;
  loading: boolean;
}

const Form: React.FC<IForm> = ({
  handleAddMovie,
  cancelModal,
  emptyMovie,
  type,
  loading,
}) => {
  const [movie, setMovie] = useState(
    emptyMovie || {
      title: "",
      year: 0,
    }
  );

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
          value={movie.year?.toString() || ""}
          placeholder="Year"
          onChange={handleChange}
          required
        />
      </label>

      {type === "edit" ? (
        <>
          <button type="submit" disabled={loading}>
            {loading ? <LoadingIcon /> : <>Save</>}
          </button>
          <button onClick={handleCancelClick}>Cancel</button>
        </>
      ) : (
        <>
          <button type="submit" disabled={loading}>
            {loading ? <LoadingIcon /> : <>Add Movie</>}
          </button>
        </>
      )}
    </form>
  );
};

export default Form;
