import { Link } from "react-router-dom";
import "./Posts.css";

export const LargePost = ({
  id,
  image,
  year,
  brand,
  model,
  condition,
  description,
  date,
  forSale,
  user,
  isOwnCollection,
}) => {
  return (
    <div className="lg-post-container">
      <Link to={`/gear/${id}`} className="post-link">
        <div className="lg-post-content">
          <img className="gear-image" src={image} alt={`${brand} ${model}`}></img>
          <div className="text-content">
            {forSale && <p className="for-sale-status">For Sale</p>}
            <h2>
              {year} {brand} {model}
            </h2>
            <p>{condition}</p>
            <p className="description">{description}</p>
            <h3>Added to Collection: {date}</h3>
            {!isOwnCollection && <p>{user}</p>}
          </div>
        </div>
      </Link>
    </div>
  );
};
