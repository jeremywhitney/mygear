import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser, getUserByEmail } from "../services/userService";
import logo from "/images/mygear-high-resolution-logo-transparent.png";
import "./Login.css";

export const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    location: "",
    about: "",
  });
  const navigate = useNavigate();

  const registerNewUser = () => {
    const newUser = { ...user };

    createUser(newUser).then((createdUser) => {
      if (createdUser.hasOwnProperty("id")) {
        localStorage.setItem(
          "mygear_user",
          JSON.stringify({ id: createdUser.id })
        );

        navigate("/");
      }
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    getUserByEmail(user.email).then((response) => {
      if (response.length > 0) {
        window.alert("Account with that email address already exists");
      } else {
        registerNewUser();
      }
    });
  };

  const updateUser = (evt) => {
    const copy = { ...user };
    copy[evt.target.id] = evt.target.value;
    setUser(copy);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <form onSubmit={handleRegister} className="p-4 border auth-form">
            <div className="text-center mb-4">
              <img src={logo} alt="myGear Logo" style={{ height: "60px" }} />
            </div>
            <h2 className="text-center mb-4 text-alt-primary">
              Please Register
            </h2>
            <div className="form-group mb-3">
              <input
                onChange={updateUser}
                type="text"
                id="name"
                className="form-control"
                placeholder="Enter your name"
                autoComplete="off"
                required
                autoFocus
              />
            </div>
            <div className="form-group mb-3">
              <input
                onChange={updateUser}
                type="email"
                id="email"
                className="form-control"
                placeholder="Email address"
                autoComplete="off"
                required
              />
            </div>
            <div className="form-group mb-3">
              <input
                onChange={updateUser}
                type="text"
                id="location"
                className="form-control"
                placeholder="Location (city, state)"
                autoComplete="off"
                required
              />
            </div>
            <button className="btn btn-primary w-100" type="submit">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
