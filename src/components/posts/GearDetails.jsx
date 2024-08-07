import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteGearPost, getPostById } from "../services/postService";
import { AddToWishlistButton } from "../wishlist/AddToWishlistButton";
import "./GearDetails.css"

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
      navigate(`/mycollection/${currentUser.id}`);
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const isGearOwner = post.userId === currentUser.id;
  const imageUrl = post.image || "/images/default.jpg";

  return (
    <div className="container gear-details-container">
      <h1 className="text-center mb-4 gear-details-title">Gear Details</h1>
      <div className="container gear-details-section">
        <div className="row">
          <div className="col-md-6 gear-image-container d-flex justify-content-center">
            <img
              src={imageUrl}
              alt={`${post.brand?.name} ${post.model}`}
              className="img-fluid gear-image"
            />
          </div>
          <div className="col-md-6 gear-info">
            <div className="mb-3">
              {isGearOwner ? (
                <div></div>
              ) : (
                <h5>
                  <Link to={`/profile/${post.userId}`} className="text-primary gear-owner-link">
                    {post.user?.name}
                  </Link>
                  's
                </h5>
              )}
            </div>
            <h2 className="gear-title">{post.year} {post.brand?.name} {post.model}</h2>
            <div className="gear-condition">Condition: {post.condition?.grade || ""}</div>
            {post.forSale && <div className="alert alert-warning gear-for-sale">For Sale</div>}
            <div className="gear-description">
              <strong>Description:</strong>
              <p>{post.description}</p>
            </div>
            <div className="gear-timestamp">Added to Collection: {post.timestamp}</div>
          </div>
        </div>
        <div className="button-container mt-4 d-flex justify-content-around">
          {isGearOwner && (
            <>
              <div className="mb-2">
                <Link to={`/gear/edit/${postId}`} className="btn btn-warning gear-edit-button">
                  Edit Gear
                </Link>
              </div>
              <div className="mb-2">
                <button
                  className="btn btn-danger gear-delete-button"
                  onClick={() => handleDelete(postId)}
                >
                  Delete
                </button>
              </div>
            </>
          )}
          {!isGearOwner && (
            <AddToWishlistButton
              userId={currentUser.id}
              postId={postId}
              wishlistType="fromPost"
              year={post.year}
              brandId={post.brand?.id}
              model={post.model}
              notes=""
              onSuccess={() => {}}
              onError={(message) => {
                console.error("Error adding to wishlist:", message);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};
