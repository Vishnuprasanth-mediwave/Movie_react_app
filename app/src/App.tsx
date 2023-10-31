import { lazy, Suspense, useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.css";

import Home from "./pages/Home";
const AddForm = lazy(() => import("./pages/AddForm"));
const EditForm = lazy(() => import("./pages/EditForm"));
import "@picocss/pico";
import { IMovie } from "./components/types";
import Loading from "./components/loding";
function App() {
  const [movie, setMovie] = useState<IMovie>({
    id: 0,
    title: "",
    year: 0,
  });
  return (
    <Suspense fallback={<Loading />}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home handleEdit={(m) => setMovie(m)} />} />
          <Route path="/new" element={<AddForm />} />
          <Route path="/edit/:id" element={<EditForm movie={movie} />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
