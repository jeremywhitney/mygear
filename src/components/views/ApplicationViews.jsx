import { useEffect, useState } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import { AllPosts } from "../posts/AllPosts";

export const ApplicationViews = () => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const localMyGearUser = localStorage.getItem("mygear_user");
    const myGearUserObject = JSON.parse(localMyGearUser);
    setCurrentUser(myGearUserObject);
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <Outlet />
          </>
        }
      >
        <Route index element={<AllPosts currentUser={currentUser} />} />
        <Route path="gear" element={<AllPosts currentUser={currentUser} />} />
      </Route>
    </Routes>
  );
};
