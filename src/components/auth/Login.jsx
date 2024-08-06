// import React, { useState } from "react"
// import { Link } from "react-router-dom"
// import { useNavigate } from "react-router-dom"
// import "./Login.css"
// import { getUserByEmail } from "../services/userService"

// export const Login = () => {
//   const [email, set] = useState("")
//   const navigate = useNavigate()

//   const handleLogin = async (e) => {
//     e.preventDefault()

//     const foundUsers = await getUserByEmail(email)
//     if (foundUsers.length === 1) {
//       const user = foundUsers[0]
//       localStorage.setItem(
//         "mygear_user",
//         JSON.stringify({
//           id: user.id,
//         })
//       )

//       navigate("/")
//     } else {
//       window.alert("Invalid login")
//     }
//   }

//   return (
//     <main className="auth-container">
//       <section>
//         <form className="auth-form" onSubmit={handleLogin}>
//           <h1 className="header">myGear</h1>
//           <h2>Please sign in</h2>
//           <fieldset className="auth-fieldset">
//             <div>
//               <input
//                 type="email"
//                 value={email}
//                 className="auth-form-input"
//                 onChange={(evt) => set(evt.target.value)}
//                 placeholder="Email address"
//                 required
//                 autoFocus
//               />
//             </div>
//           </fieldset>
//           <fieldset className="auth-fieldset">
//             <div>
//               <button className="sign-in-button" type="submit">Sign in</button>
//             </div>
//           </fieldset>
//         </form>
//       </section>
//       <section className="register-link">
//         <Link to="/register">Not a member yet?</Link>
//       </section>
//     </main>
//   )
// }

// BOOSTRAP //
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { getUserByEmail } from "../services/userService";

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
          <form onSubmit={handleLogin} className="p-4 border rounded bg-light">
            <h1 className="text-center mb-4">myGear</h1>
            <h2 className="text-center mb-4">Please sign in</h2>
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
            <button className="btn btn-dark w-100 mb-3" type="submit">Sign in</button>
            <div className="text-center">
              <Link to="/register">Not a member yet?</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
