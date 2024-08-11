import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { editUser, getUserById } from "../services/userService";
import { getPostsByUserId } from "../services/postService";
import "./Profile.css";

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
    <div className="container user-profile-container p-4 mt-4">
      <div className="text-center mb-4">
        {isEditMode ? (
          <div className="d-flex justify-content-center mb-2">
            <input
              type="text"
              value={editableName}
              onChange={handleNameChange}
              className="form-control user-profile-name-input"
              placeholder="Enter name"
            />
          </div>
        ) : (
          <h1 className="user-profile-heading">{user.name}'s Profile</h1>
        )}
        {isEditMode ? (
          <div className="d-flex justify-content-center">
            <input
              type="text"
              value={editableLocation}
              onChange={handleLocationChange}
              className="form-control user-profile-location-input mt-2"
              placeholder="Enter location"
            />
          </div>
        ) : (
          <p className="user-profile-location">
            <strong>Location:</strong> {user.location}
          </p>
        )}
      </div>
      <div className="mb-4 text-center user-profile-collection-info">
        <p className="user-profile-collection-text font-weight-bold">
          {postsCount} pieces of gear in{" "}
          <Link to={`/mycollection/${user.id}`} className="text-primary">
            My Collection
          </Link>
        </p>
      </div>
      <div className="mb-4 mx-auto user-profile-about">
        {isEditMode ? (
          <textarea
            value={editableAboutMe}
            onChange={handleAboutMeChange}
            className="form-control user-profile-input"
            placeholder="About me"
            rows="5"
          />
        ) : (
          <div className="user-profile-about-text">
            <p>
              <strong>About Me:</strong>
            </p>
            <p>{user.about}</p>
          </div>
        )}
      </div>
      {currentUser.id === user.id && (
        <div className="d-flex justify-content-end">
          {isEditMode ? (
            <button className="btn btn-primary me-2" onClick={handleSave}>
              Save
            </button>
          ) : (
            <button className="btn btn-secondary" onClick={toggleEditMode}>
              Edit Profile
            </button>
          )}
        </div>
      )}
    </div>
  );
};
