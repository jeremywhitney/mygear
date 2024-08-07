import { Link } from "react-router-dom";
import "./SmallPosts.css";

export const SmallPost = ({ id, image, year, brand, model, user }) => {
  return (
    <div className="small-card position-relative d-flex justify-content-center align-items-center overflow-hidden">
      <Link to={`/gear/${id}`} className="small-text-decoration-none">
        <div className="position-relative">
          <img
            src={image}
            alt={`${brand} ${model}`}
            className="small-card-img-top small-post-img"
          />
          <div className="small-overlay position-absolute d-flex justify-content-center align-items-center">
            <div className="text-center text-white">
              <h5 className="small-card-title">
                {year} {brand} {model}
              </h5>
              <p className="small-card-text">{user}</p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};
