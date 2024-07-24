import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";

export const NavBar = () => {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("mygear_user"));

  return (
    <ul className="navbar">
      <li className="navbar-item">
        <Link to="/gear">All Posts</Link>
      </li>
      <li className="navbar-item">
        <Link to="/mycollection">My Collection</Link>
      </li>
      <li className="navbar-item">
        <Link to="/addgear">Add Gear</Link>
      </li>
      <li className="navbar-item">Wishlist</li>
      <li className="navbar-item">Profile</li>
      {localStorage.getItem("mygear_user") ? (
        <li className="navbar-item navbar-logout">
          <Link
            to="navbar-link"
            onClick={() => {
              localStorage.removeItem("mygear_user");
              navigate("/login", { replace: true });
            }}
          >
            Logout
          </Link>
        </li>
      ) : (
        ""
      )}
    </ul>
  );
};
