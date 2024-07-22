import { Route, Routes } from "react-router-dom";
import { Login } from "./src/components/auth/Login";
import { Register } from "./src/components/auth/Register";
import { Authorized } from "./src/components/views/Authorized";

export const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<Authorized></Authorized>} />
    </Routes>
  );
};
