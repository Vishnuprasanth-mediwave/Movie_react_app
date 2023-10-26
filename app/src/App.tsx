import { lazy, Suspense } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import Home from "./pages/Home";
const AddForm = lazy(() => import("./pages/AddForm"));
const EditForm = lazy(() => import("./pages/EditForm"));
import "@picocss/pico";
function Loading() {
  return <p>Loading ...</p>;
}
function App() {
  return (
    <Suspense fallback={<Loading />}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new" element={<AddForm />} />
          <Route path="/edit" element={<EditForm />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
