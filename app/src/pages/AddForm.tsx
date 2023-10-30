import { useNavigate } from "react-router-dom";
import Layout from "../components/layout";
import { addMovie } from "../services/api";
import Form from "../components/form";
import { IMovieAdd, IShowError } from "../components/types";
import { useState } from "react";
import Modal from "../components/modal";

function AddForm() {
  const [showModal, setShowModal] = useState(false);
  const [showModalMsg, setShowModalMsg] = useState<IShowError>({
    action: "",
    msg: "",
  });
  const navigate = useNavigate();
  const movie = {
    title: "",
    year: parseInt(""),
  };
  const toggleModal = () => {
    setShowModal((prevShowModal) => !prevShowModal);
  };
  async function handleAddMovie(movie: IMovieAdd) {
    toggleModal();
    try {
      const moviePayload = {
        title: movie.title,
        year: movie.year,
      };
      const response = await addMovie(moviePayload);
      console.log(response);
      setShowModalMsg({
        action: "Succes",
        msg: "Movie Added",
      });
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error deleting movie:", error);
        setShowModalMsg({
          action: "Failed",
          msg: error.message,
        });
      }
    }
  }
  function navigateToHome() {
    navigate("/");
  }
  return (
    <>
      <Layout title="addForm">
        <h1>AddForm</h1>
        <Form handleAddMovie={handleAddMovie} emptyMovie={movie} />
        {showModal && (
          <Modal
            errorMsg={showModalMsg}
            closeModal={toggleModal}
            navigateToHome={navigateToHome}
          />
        )}
      </Layout>
    </>
  );
}

export default AddForm;
