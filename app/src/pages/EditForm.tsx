import { Link } from "react-router-dom";
const EditForm = () => {
  return (
    <>
      <main className="container">
        <form>
          <label htmlFor="title">
            Title
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Title"
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
          <div className="grid">
            <Link to="/">
              <button>add</button>
            </Link>
            <Link to="/">
              <button>Cancel</button>
            </Link>
          </div>
        </form>
      </main>
    </>
  );
};

export default EditForm;
