import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IEditForm, IMovieAdd, IShowError } from "../components/types";
import Layout from "../components/layout";
import { updateMovie } from "../services/api";
import Form from "../components/form";
import Modal from "../components/modal";

const EditForm: React.FC<IEditForm> = ({ movie }) => {
  const [showModal, setShowModal] = useState(false);
  const [showModalMsg, setShowModalMsg] = useState<IShowError>({
    action: "",
    msg: "",
  });
  const navigate = useNavigate();
  const { id } = useParams();
  const editValue = {
    title: movie.title,
    year: movie.year,
  };
  const [isLoading, setIsLoading] = useState(false);
  const toggleModal = () => {
    setShowModal((prevShowModal) => !prevShowModal);
  };

  useEffect(() => {
    console.log("Getting info of ", id);
  }, [id]);

  async function handleEditMovie(editedmovie: IMovieAdd) {
    setIsLoading(true);

    try {
      const response = await updateMovie(editedmovie, movie.id);
      console.log(response);
      setShowModalMsg({
        action: "Success",
        msg: "Movie Edited",
      });
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error editing movie:", error);
        setShowModalMsg({
          action: "Failed",
          msg: error.message,
        });
      }
    } finally {
      setIsLoading(false);
      toggleModal();
    }
  }

  function navigateToHome() {
    navigate("/");
  }

  function cancelModal() {
    setShowModalMsg({
      action: "Cancelled",
      msg: "If you want to go to the home, click the confirm button",
    });
    toggleModal();
  }

  return (
    <>
      <Layout title={`Edit Movie ${movie.title}`}>
        <Form
          handleAddMovie={handleEditMovie}
          cancelModal={cancelModal}
          emptyMovie={editValue}
          type="edit"
          loading={isLoading}
        />
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
};

export default EditForm;
