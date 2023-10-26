import { Link, useNavigate } from "react-router-dom";
import Layout from "../components/layout";
import { addMovie } from "../services/api";
import { useState } from "react";

function AddForm() {
  const navigate = useNavigate();
  const [movie, setMovie] = useState({});

  async function addThisDummyMovie() {
    try {
      const moviePayload = {
        title: "My dummy movie",
        year: 1998,
      };
      const response = await addMovie(moviePayload);
      console.log(response);
      navigate("/");
    } catch (error) {
      console.log("Errored");
      console.log(error);
    }
  }
  //   function handleChange(e:React.ChangeEvent<HTMLInputElement>){
  //     const updatedMovie=
  //   }

  return (
    <>
      <Layout title="addForm">
        <h1>AddForm</h1>
        <form>
          <label htmlFor="title">
            Title
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Title"
              //   onChange={e=>handleChange(e)}
              required
            />
          </label>

          <label htmlFor="year">
            Year
            <input
              type="text"
              id="year"
              name="year"
              placeholder="Year"
              required
            />
          </label>
        </form>

        <button onClick={() => addThisDummyMovie()}>add dummy movie</button>

        <Link to="/">
          <button>Submit</button>
        </Link>
      </Layout>
    </>
  );
}

export default AddForm;
