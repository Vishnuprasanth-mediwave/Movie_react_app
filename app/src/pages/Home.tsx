import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMovies, deleteMovie } from "../services/api";
import Layout from "../components/layout";
import { IMovie, IShowError } from "../components/types";

import "@picocss/pico";
import Modal from "../components/modal";

import LoadingIcon from "../components/Loading/LoadingIcon";

interface IHome {
  handleEdit: (movie: IMovie) => void;
}

const Home: React.FC<IHome> = ({ handleEdit }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showModalMsg, setShowModalMsg] = useState<IShowError>({
    action: "",
    msg: "",
  });

  const toggleModal = () => {
    setShowModal((prevShowModal) => !prevShowModal);
  };

  useEffect(() => {
    console.log("Called once");

    async function getMoviesFromAPI() {
      setIsLoading(true);
      try {
        const response = await getMovies();
        setMovies(response.data);
      } catch (error) {
        toggleModal();
        if (error instanceof Error) {
          console.error("Error deleting movie:", error);
          setShowModalMsg({
            action: "Failed",
            msg: error.message,
          });
        }
      } finally {
        setIsLoading(false);
      }
    }

    getMoviesFromAPI();
  }, [refresh]);
  async function handleDelete(id: number) {
    setIsLoading(true);

    try {
      await deleteMovie(id);
      toggleModal();
      setShowModalMsg({
        action: "Succes",
        msg: "deleted",
      });
      setRefresh((prev) => !prev);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error deleting movie:", error);
        toggleModal();
        setShowModalMsg({
          action: "Failed",
          msg: error.message,
        });
      } else {
        console.error("An unknown error occurred:", error);
        setShowModalMsg({
          action: "failed",
          msg: "An unknown error occurred.",
        });
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Layout title="Home">
        <h1>Home</h1>

        <div className="container">
          <Link to="/new" role="button" className="secondary">
            +
          </Link>
          <button
            disabled={isLoading}
            onClick={() => setRefresh((prev) => !prev)}
          >
            {isLoading ? <LoadingIcon /> : <>refresh</>}
          </button>
          {/* {isLoading ? (
            <p>Loading movies!</p>
          ) : ( */}
          <div className="grid">
            {movies.map((m) => (
              <article key={m.id}>
                <h1>{m.title}</h1>
                <h3>{m.year}</h3>

                <div className="grid">
                  <Link to={`/edit/${m.id}`}>
                    <button onClick={() => handleEdit(m)}>Edit</button>
                  </Link>
                  <button onClick={() => handleDelete(m.id)}>
                    {isLoading ? <LoadingIcon /> : <>delete</>}
                  </button>
                </div>
              </article>
            ))}
            {showModal && (
              <Modal
                errorMsg={showModalMsg}
                closeModal={toggleModal}
                navigateToHome={toggleModal}
              />
            )}
          </div>
          {/* )} */}
        </div>
      </Layout>
    </>
  );
};

export default Home;
