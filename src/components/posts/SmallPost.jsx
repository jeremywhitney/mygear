import "./Posts.css";

export const SmallPost = ({ image, year, brand, model, user }) => {
  return (
    <div className="post-container">
      <div className="post-content">
        <img src={image} alt={`${brand} ${model}`}></img>
        <div className="text-content">
          <h3>
            {year} {brand} {model}
          </h3>
          <p>{user}</p>
        </div>
      </div>
    </div>
  );
};
