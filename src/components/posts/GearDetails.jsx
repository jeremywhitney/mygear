import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getPostById } from "../services/postService";
import "./Posts.css";

export const GearDetails = ({ currentUser }) => {
  const [post, setPost] = useState({});
  const { postId } = useParams();

  useEffect(() => {
    getPostById(postId).then((postObj) => {
      setPost(postObj);
    });
  }, [postId]);

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
            {isGearOwner ? <div></div> : <div>{post.user?.name}'s</div>}

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
        {isGearOwner && (
          <div className="edit-gear-button">
            <Link to={`/gear/edit/${postId}`}>Edit Gear</Link>
          </div>
        )}
      </div>
    </>
  );
};
