import { Link } from "react-router-dom";
import "./LargePosts.css";

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
    <div className="col-12 mb-4">
      <div className="large-card lg-post-container position-relative ">
        <Link to={`/gear/${id}`} className="large-post-link">
          <div className="row no-gutters">
            <div className="col-md-4 overflow-hidden">
              <img
                src={image}
                alt={`${brand} ${model}`}
                className="large-card-img large-post-img"
              />
            </div>
            <div className="col-md-8 d-flex flex-column justify-content-between">
              <div className="large-card-body text-content">
                {forSale && (
                  <p className="large-for-sale-status badge badge-warning">For Sale</p>
                )}
                <h2 className="large-card-title">
                  {year} {brand} {model}
                </h2>
                <p className="large-card-text">{condition}</p>
                <p className="large-description">{description}</p>
                <p className="large-card-subtitle mb-2 text-muted">Added to Collection: {date}</p>
                {!isOwnCollection && <p className="large-card-text">{user}</p>}
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};
