import { useEffect, useState } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import { AllPosts } from "../posts/AllPosts";
import { NavBar } from "../nav/NavBar";
import { AddGear } from "../forms/AddGear";
import { MyCollection } from "../posts/MyCollection";
import { GearDetails } from "../posts/GearDetails";
import { EditGear } from "../forms/EditGear";
import { UserProfile } from "../users/UserProfile";

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
            <NavBar />
            <Outlet />
          </>
        }
      >
        <Route index element={<AllPosts currentUser={currentUser} />} />
        <Route 
          path="gear" 
          element={<AllPosts currentUser={currentUser} />} />
        <Route
          path="gear/:postId"
          element={<GearDetails currentUser={currentUser} />}
        />
        <Route
          path="gear/edit/:postId"
          element={<EditGear currentUser={currentUser} />}
        />
        <Route
          path="mycollection"
          element={<MyCollection currentUser={currentUser} />}
        />
        <Route 
          path="addgear" 
          element={<AddGear currentUser={currentUser} />} />
        <Route
          path="profile/:userId"
          element={<UserProfile currentUser={currentUser} />}
        />
      </Route>
    </Routes>
  );
};
