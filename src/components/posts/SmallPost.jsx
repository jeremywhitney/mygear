// import { Link } from "react-router-dom";
// import "./Posts.css";

// export const SmallPost = ({ id, image, year, brand, model, user }) => {
//   return (
//     <div className="sm-post-container">
//       <Link to={`/gear/${id}`} className="post-link">
//       <div className="sm-post-content">
//         <img src={image} alt={`${brand} ${model}`}></img>
//         <div className="text-content">
//           <h3>
//             {year} {brand} {model}
//           </h3>
//           <p>{user}</p>
//         </div>
//       </div>
//       </Link>
//     </div>
//   );
// };


// BOOTSTRAP //
import { Link } from "react-router-dom";

export const SmallPost = ({ id, image, year, brand, model, user }) => {
  return (
    <div className="card sm-post-container">
      <Link to={`/gear/${id}`} className="post-link">
        <div className="row no-gutters">
          <div className="col-md-4">
            <img src={image} alt={`${brand} ${model}`} className="card-img" />
          </div>
          <div className="col-md-8 d-flex align-items-center">
            <div className="card-body text-content">
              <h3 className="card-title">
                {year} {brand} {model}
              </h3>
              <p className="card-text">{user}</p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};
