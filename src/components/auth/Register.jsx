// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { createUser, getUserByEmail } from "../services/userService";
// import "./Login.css";

// export const Register = (props) => {
//   const [user, setUser] = useState({
//     name: "",
//     email: "",
//     location: "",
//     about: "",
//   });
//   let navigate = useNavigate();

//   const registerNewUser = () => {
//     const newUser = {
//       ...user,
//     };

//     createUser(newUser).then((createdUser) => {
//       if (createdUser.hasOwnProperty("id")) {
//         localStorage.setItem(
//           "mygear_user",
//           JSON.stringify({
//             id: createdUser.id,
//           })
//         );

//         navigate("/");
//       }
//     });
//   };

//   const handleRegister = (e) => {
//     e.preventDefault();
//     getUserByEmail(user.email).then((response) => {
//       if (response.length > 0) {
//         // Duplicate email. No good.
//         window.alert("Account with that email address already exists");
//       } else {
//         // Good email, create user.
//         registerNewUser();
//       }
//     });
//   };

//   const updateUser = (evt) => {
//     const copy = { ...user };
//     copy[evt.target.id] = evt.target.value;
//     setUser(copy);
//   };

//   return (
//     <main className="auth-container">
//       <form className="auth-form" onSubmit={handleRegister}>
//         <h1 className="header">myGear</h1>
//         <h2>Please Register</h2>
//         <fieldset className="auth-fieldset">
//           <div>
//             <input
//               onChange={updateUser}
//               type="text"
//               id="name"
//               className="auth-form-input"
//               placeholder="Enter your name"
//               required
//               autoFocus
//             />
//           </div>
//         </fieldset>
//         <fieldset className="auth-fieldset">
//           <div>
//             <input
//               onChange={updateUser}
//               type="email"
//               id="email"
//               className="auth-form-input"
//               placeholder="Email address"
//               required
//             />
//           </div>
//         </fieldset>
//         <fieldset className="auth-fieldset">
//           <div>
//             <input
//               onChange={updateUser}
//               type="text"
//               id="location"
//               className="auth-form-input"
//               placeholder="Location (city, state)"
//               required
//             />
//           </div>
//         </fieldset>
//         <fieldset className="auth-fieldset">
//           <div>
//             <button className="register-button" type="submit">Register</button>
//           </div>
//         </fieldset>
//       </form>
//     </main>
//   );
// };


// BOOSTRAP //
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser, getUserByEmail } from "../services/userService";
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
          <form onSubmit={handleRegister} className="p-4 border rounded bg-light">
            <h1 className="text-center mb-4">myGear</h1>
            <h2 className="text-center mb-4">Please Register</h2>
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
            <button className="btn btn-dark w-100" type="submit">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
