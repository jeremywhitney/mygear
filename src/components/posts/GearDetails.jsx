// import { useEffect, useState } from "react";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { deleteGearPost, getPostById } from "../services/postService";
// import { AddToWishlistButton } from "../wishlist/AddToWishlistButton";
// import "./Posts.css";

// export const GearDetails = ({ currentUser }) => {
//   const [post, setPost] = useState({});
//   const { postId } = useParams();
//   const navigate = useNavigate();

//   useEffect(() => {
//     getPostById(postId).then((postObj) => {
//       setPost(postObj);
//     });
//   }, [postId]);

//   const handleDelete = async (postId) => {
//     try {
//       await deleteGearPost(postId);
//       navigate(`/mycollection/${currentUser.id}`);
//     } catch (error) {
//       console.error("Error deleting post:", error);
//     }
//   };

//   const isGearOwner = post.userId === currentUser.id;
//   const imageUrl = post.image || "/images/default.jpg";

//   return (
//     <>
//       <h1>Gear Details</h1>
//       <div className="gear-details-container">
//         <div className="gear-details-content">
//           <img
//             src={imageUrl}
//             alt={`${post.brand?.name} ${post.model}`}
//             className="gear-image"
//           />
//           <div className="gear-info">
//             {isGearOwner ? (
//               <div></div>
//             ) : (
//               <div>
//                 <Link to={`/profile/${post.userId}`}>{post.user?.name}</Link>'s
//               </div>
//             )}

//             <h2>
//               {post.year} {post.brand?.name} {post.model}
//             </h2>
//             <div>Condition: {post.condition?.grade || ""}</div>
//             {post.forSale && <div className="for-sale">For Sale</div>}
//             <div>
//               Description:
//               <p>{post.description}</p>
//             </div>
//             <div>Added to Collection: {post.timestamp}</div>
//           </div>
//         </div>
//         <div className="button-container">
//           {isGearOwner && (
//             <button className="edit-gear-button">
//               <Link
//                 to={`/gear/edit/${postId}`}
//                 className="edit-gear-button-link"
//               >
//                 Edit Gear
//               </Link>
//             </button>
//           )}
//           {isGearOwner && (
//             <div>
//               <button
//                 className="delete-gear-button"
//                 onClick={() => handleDelete(postId)}
//               >
//                 Delete
//               </button>
//             </div>
//           )}
//           {!isGearOwner && (
//             <AddToWishlistButton
//               userId={currentUser.id}
//               postId={postId}
//               wishlistType="fromPost"
//               year={post.year}
//               brandId={post.brand?.id}
//               model={post.model}
//               notes=""
//               onSuccess={() => {
//               }}
//               onError={(message) => {
//                 console.error("Error adding to wishlist:", message);
//               }}
//             />
//           )}
//         </div>
//       </div>
//     </>
//   );
// };


// BOOSTRAP //
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteGearPost, getPostById } from "../services/postService";
import { AddToWishlistButton } from "../wishlist/AddToWishlistButton";

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
    <>
      <h1 className="mb-4">Gear Details</h1>
      <div className="container gear-details-container">
        <div className="row">
          <div className="col-md-6">
            <img
              src={imageUrl}
              alt={`${post.brand?.name} ${post.model}`}
              className="img-fluid gear-image rounded"
            />
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              {isGearOwner ? (
                <div></div>
              ) : (
                <div>
                  <Link to={`/profile/${post.userId}`} className="text-primary">
                    {post.user?.name}
                  </Link>'s
                </div>
              )}
            </div>
            <h2>{post.year} {post.brand?.name} {post.model}</h2>
            <div className="mb-2">Condition: {post.condition?.grade || ""}</div>
            {post.forSale && <div className="alert alert-warning">For Sale</div>}
            <div className="mb-2">
              <strong>Description:</strong>
              <p>{post.description}</p>
            </div>
            <div>Added to Collection: {post.timestamp}</div>
          </div>
        </div>
        <div className="button-container mt-4">
          {isGearOwner && (
            <div className="mb-2">
              <Link to={`/gear/edit/${postId}`} className="btn btn-warning">
                Edit Gear
              </Link>
            </div>
          )}
          {isGearOwner && (
            <div className="mb-2">
              <button
                className="btn btn-danger"
                onClick={() => handleDelete(postId)}
              >
                Delete
              </button>
            </div>
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
    </>
  );
};
