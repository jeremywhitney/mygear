import { Link, useNavigate } from "react-router-dom";
import logo from "/images/mygear-high-resolution-logo-transparent.png"; 

export const NavBar = () => {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("mygear_user"));

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="myGear Logo" style={{ height: '40px' }} />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/gear">
                All Posts
              </Link>
            </li>
            <li className="nav-item">
              {currentUser && (
                <Link className="nav-link" to={`/mycollection/${currentUser.id}`}>
                  My Collection
                </Link>
              )}
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/addgear">
                Add Gear
              </Link>
            </li>
            <li className="nav-item">
              {currentUser && (
                <Link className="nav-link" to={`/wishlist/${currentUser.id}`}>
                  Wishlist
                </Link>
              )}
            </li>
            <li className="nav-item">
              {currentUser && (
                <Link className="nav-link" to={`/profile/${currentUser.id}`}>
                  Profile
                </Link>
              )}
            </li>
            {!currentUser ? (
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
            ) : (
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
      </div>
    </nav>
  );
};
