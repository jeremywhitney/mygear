// import { Link, useNavigate } from "react-router-dom";

// export const NavBar = () => {
//   const navigate = useNavigate();
//   const currentUser = JSON.parse(localStorage.getItem("mygear_user"));

//   return (
//     <ul className="navbar">
//       <li className="navbar-item">
//         <Link to="/gear">All Posts</Link>
//       </li>
//       <li className="navbar-item">
//         <Link to={`/mycollection/${currentUser.id}`}>My Collection</Link>
//       </li>
//       <li className="navbar-item">
//         <Link to="/addgear">Add Gear</Link>
//       </li>
//       <li className="navbar-item">
//         <Link to={`/wishlist/${currentUser.id}`}>Wishlist</Link>
//       </li>
//       <li className="navbar-item">
//         <Link to={`/profile/${currentUser.id}`}>Profile</Link>
//       </li>
//       {localStorage.getItem("mygear_user") ? (
//         <li className="navbar-item navbar-logout">
//           <Link
//             to="navbar-link"
//             onClick={() => {
//               localStorage.removeItem("mygear_user");
//               navigate("/login", { replace: true });
//             }}
//           >
//             Logout
//           </Link>
//         </li>
//       ) : (
//         ""
//       )}
//     </ul>
//   );
// };


// BOOTSTRAP //
import { Link, useNavigate } from "react-router-dom";


export const NavBar = () => {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("mygear_user"));

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className="nav-link" to="/gear">All Posts</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={`/mycollection/${currentUser.id}`}>My Collection</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/addgear">Add Gear</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={`/wishlist/${currentUser.id}`}>Wishlist</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={`/profile/${currentUser.id}`}>Profile</Link>
          </li>
          {localStorage.getItem("mygear_user") && (
            <li className="nav-item">
              <Link
                className="nav-link"
                to="#"
                onClick={() => {
                  localStorage.removeItem("mygear_user");
                  navigate("/login", { replace: true });
                }}
              >
                Logout
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};
