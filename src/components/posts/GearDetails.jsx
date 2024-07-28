import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteGearPost, getPostById } from "../services/postService";
import "./Posts.css";

export const GearDetails = ({ currentUser }) => {
  const [post, setPost] = useState({});
  const { postId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getPostById(postId).then((postObj) => {
      setPost(postObj);
    });
  }, [postId]);

  const handleDelete = async (postId) => {
    try {
      await deleteGearPost(postId);
      navigate("/mycollection");
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const isGearOwner = post.userId === currentUser.id;

  return (
    <>
      <h1>Gear Details</h1>
      <div className="gear-details-container">
        <div className="gear-details-content">
          <img
            src={post.image}
            alt={`${post.brand?.name} ${post.model}`}
            className="gear-image"
          />
          <div className="gear-info">
            {isGearOwner ? (
              <div></div>
            ) : (
              <div>
                <Link to={`/profile/${post.userId}`}>{post.user?.name}</Link>'s
              </div>
            )}

            <h2>
              {post.year} {post.brand?.name} {post.model}
            </h2>
            <div>Condition: {post.condition?.grade || ""}</div>
            {post.forSale && <div className="for-sale">For Sale</div>}
            <div>
              Description:
              <p>{post.description}</p>
            </div>
            <div>Added to Collection: {post.timestamp}</div>
          </div>
        </div>
        <div className="button-container">
          {isGearOwner && (
            <button className="edit-gear-button">
              <Link
                to={`/gear/edit/${postId}`}
                className="edit-gear-button-link"
              >
                Edit Gear
              </Link>
            </button>
          )}
          {isGearOwner && (
            <div>
              <button
                className="delete-gear-button"
                onClick={() => handleDelete(postId)}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
