import { Link } from "react-router-dom";
import "./Posts.css";

export const SmallPost = ({ id, image, year, brand, model, user }) => {
  return (
    <div className="sm-post-container">
      <Link to={`/gear/${id}`} className="post-link">
      <div className="sm-post-content">
        <img src={image} alt={`${brand} ${model}`}></img>
        <div className="text-content">
          <h3>
            {year} {brand} {model}
          </h3>
          <p>{user}</p>
        </div>
      </div>
      </Link>
    </div>
  );
};
