// BOOTSTRAP //
import { Link } from "react-router-dom";
import "./Posts.css";

export const SmallPost = ({ id, image, year, brand, model, user }) => {
  return (
    <div className="card small-post d-flex justify-content-center position-relative overflow-hidden">
      <Link to={`/gear/${id}`} className="text-decoration-none">
        <div className="position-relative">
          <img
            src={image}
            alt={`${brand} ${model}`}
            className="card-img-top small-post-img"
          />
          <div className="overlay d-flex justify-content-center align-items-center">
            <div className="text-center text-white">
              <h5 className="card-title">
                {year} {brand} {model}
              </h5>
              <p className="card-text">{user}</p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};
