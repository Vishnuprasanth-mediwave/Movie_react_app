import { useState } from "react";
interface IForm {
  handleAddMovie: () => void;
}
const Form: React.FC<IForm> = (handleAddMovie) => {
  const [movie, setMovie] = useState({
    title: "",
    year: 0,
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setMovie({ ...movie, [name]: value });
    console.log(movie);
  }
  return (
    <form>
      <label htmlFor="title">
        Title
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Title"
          onChange={(e) => handleChange(e)}
          required
        />
      </label>

      <label htmlFor="year">
        Year
        <input
          type="number"
          id="year"
          name="year"
          placeholder="Year"
          onChange={(e) => handleChange(e)}
          required
        />
      </label>
      <button onSubmit={() => handleAddMovie}>add movie</button>
    </form>
  );
};
export default Form;
