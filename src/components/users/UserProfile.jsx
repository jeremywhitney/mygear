// import { useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import { editUser, getUserById } from "../services/userService";
// import { getPostsByUserId } from "../services/postService";
// import "./Profile.css";

// export const UserProfile = ({ currentUser }) => {
//   const [user, setUser] = useState({});
//   const [postsCount, setPostsCount] = useState(0);
//   const [isEditMode, setIsEditMode] = useState(false);
//   const [editableName, setEditableName] = useState("");
//   const [editableLocation, setEditableLocation] = useState("");
//   const [editableAboutMe, setEditableAboutMe] = useState("");
//   const { userId } = useParams();

//   useEffect(() => {
//     const fetchUserData = async () => {
//       const userObj = await getUserById(userId);
//       setUser(userObj);
//       setEditableName(userObj.name);
//       setEditableLocation(userObj.location);
//       setEditableAboutMe(userObj.about);

//       const postsArray = await getPostsByUserId(userId);
//       setPostsCount(postsArray.length);
//     };
//     fetchUserData();
//   }, [userId]);

//   const toggleEditMode = () => {
//     setIsEditMode(!isEditMode);
//   };

//   const handleNameChange = (event) => setEditableName(event.target.value);
//   const handleLocationChange = (event) =>
//     setEditableLocation(event.target.value);
//   const handleAboutMeChange = (event) => setEditableAboutMe(event.target.value);

//   const handleSave = async () => {
//     const updatedUser = {
//       ...user,
//       name: editableName,
//       location: editableLocation,
//       about: editableAboutMe,
//     };
//     await editUser(userId, updatedUser);
//     setUser(updatedUser);
//     setIsEditMode(false);
//   };

//   return (
//     <div className="user-profile-container">
//       <div className="user-name">
//         {isEditMode ? (
//           <input type="text" value={editableName} onChange={handleNameChange} />
//         ) : (
//           <span>{user.name}'s Profile</span>
//         )}
//       </div>
//       <div className="user-location">
//         {isEditMode ? (
//           <input
//             type="text"
//             value={editableLocation}
//             onChange={handleLocationChange}
//           />
//         ) : (
//           <span>{user.location}</span>
//         )}
//       </div>
//       <div className="user-posts">
//         {postsCount} pieces of gear in{" "}
//         <Link to={`/mycollection/${user.id}`}>My Collection</Link>
//       </div>
//       <div className="user-about">
//         {isEditMode ? (
//           <textarea value={editableAboutMe} onChange={handleAboutMeChange} />
//         ) : (
//           <span>{user.about}</span>
//         )}
//       </div>
//       {currentUser.id === user.id && (
//         <div>
//           {isEditMode ? (
//             <>
//               <button className="save-button" onClick={handleSave}>
//                 Save
//               </button>
//             </>
//           ) : (
//             <button className="edit-button" onClick={toggleEditMode}>
//               Edit Profile
//             </button>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };


// BOOTSTRAP //
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { editUser, getUserById } from "../services/userService";
import { getPostsByUserId } from "../services/postService";

export const UserProfile = ({ currentUser }) => {
  const [user, setUser] = useState({});
  const [postsCount, setPostsCount] = useState(0);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editableName, setEditableName] = useState("");
  const [editableLocation, setEditableLocation] = useState("");
  const [editableAboutMe, setEditableAboutMe] = useState("");
  const { userId } = useParams();

  useEffect(() => {
    const fetchUserData = async () => {
      const userObj = await getUserById(userId);
      setUser(userObj);
      setEditableName(userObj.name);
      setEditableLocation(userObj.location);
      setEditableAboutMe(userObj.about);

      const postsArray = await getPostsByUserId(userId);
      setPostsCount(postsArray.length);
    };
    fetchUserData();
  }, [userId]);

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const handleNameChange = (event) => setEditableName(event.target.value);
  const handleLocationChange = (event) =>
    setEditableLocation(event.target.value);
  const handleAboutMeChange = (event) => setEditableAboutMe(event.target.value);

  const handleSave = async () => {
    const updatedUser = {
      ...user,
      name: editableName,
      location: editableLocation,
      about: editableAboutMe,
    };
    await editUser(userId, updatedUser);
    setUser(updatedUser);
    setIsEditMode(false);
  };

  return (
    <div className="container user-profile-container">
      <div className="mb-3">
        {isEditMode ? (
          <input 
            type="text" 
            value={editableName} 
            onChange={handleNameChange} 
            className="form-control"
            placeholder="Enter name"
          />
        ) : (
          <h2>{user.name}'s Profile</h2>
        )}
      </div>
      <div className="mb-3">
        {isEditMode ? (
          <input
            type="text"
            value={editableLocation}
            onChange={handleLocationChange}
            className="form-control"
            placeholder="Enter location"
          />
        ) : (
          <p><strong>Location:</strong> {user.location}</p>
        )}
      </div>
      <div className="mb-3">
        <p>{postsCount} pieces of gear in{" "}
          <Link to={`/mycollection/${user.id}`}>My Collection</Link>
        </p>
      </div>
      <div className="mb-3">
        {isEditMode ? (
          <textarea 
            value={editableAboutMe} 
            onChange={handleAboutMeChange} 
            className="form-control"
            placeholder="About me"
          />
        ) : (
          <p><strong>About:</strong> {user.about}</p>
        )}
      </div>
      {currentUser.id === user.id && (
        <div className="d-flex justify-content-end">
          {isEditMode ? (
            <button 
              className="btn btn-primary me-2" 
              onClick={handleSave}>
              Save
            </button>
          ) : (
            <button 
              className="btn btn-secondary" 
              onClick={toggleEditMode}>
              Edit Profile
            </button>
          )}
        </div>
      )}
    </div>
  );
};