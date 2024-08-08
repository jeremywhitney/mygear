import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUserByEmail } from "../services/userService";
import logo from "/images/mygear-high-resolution-logo-transparent.png";
import "./Login.css";

export const Login = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const foundUsers = await getUserByEmail(email);
    if (foundUsers.length === 1) {
      const user = foundUsers[0];
      localStorage.setItem(
        "mygear_user",
        JSON.stringify({
          id: user.id,
        })
      );

      navigate("/");
    } else {
      window.alert("Invalid login");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <form onSubmit={handleLogin} className="p-4 border auth-form">
            <div className="text-center mb-4">
              <img src={logo} alt="myGear Logo" style={{ height: "60px" }} />
            </div>
            <h2 className="text-center mb-4 text-alt-primary">
              Please sign in
            </h2>
            <div className="form-group mb-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                placeholder="Email address"
                autoComplete="off"
                required
                autoFocus
              />
            </div>
            <button className="btn btn-primary w-100 mb-3" type="submit">
              Sign in
            </button>
            <div className="text-center">
              <Link to="/register" className="text-accent">
                Not a member yet?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
