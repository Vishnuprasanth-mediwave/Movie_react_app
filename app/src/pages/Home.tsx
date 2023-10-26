import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMovies } from "../services/api";
import Layout from "../components/layout";

import "@picocss/pico";

interface IMovie {
  id: number;
  title: string;
  year: number;
}

function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [movies, setMovies] = useState<IMovie[]>([]);

  useEffect(() => {
    console.log("Called once");

    async function getMoviesFromAPI() {
      setIsLoading(true);
      try {
        const response = await getMovies();
        setMovies(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    getMoviesFromAPI();
  }, [refresh]);

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
            refresh list
          </button>
          {isLoading ? (
            <p>Loading movies!</p>
          ) : (
            <div className="grid">
              {movies.map((m) => (
                <article key={m.id}>
                  <h1>{m.title}</h1>
                  <h3>{m.year}</h3>

                  <div className="grid">
                    <Link to={`/edit/${m.id}`} className="pico-link">
                      <button>Edit</button>
                    </Link>
                    <button>delete</button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </Layout>
    </>
  );
}

export default Home;
