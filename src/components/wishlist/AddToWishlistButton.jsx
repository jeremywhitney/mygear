import { useNavigate } from "react-router-dom";
import { createWishlistPost } from "../services/wishlistService";
import { getPostById } from "../services/postService";

export const AddToWishlistButton = ({
  userId,
  postId,
  wishlistType,
  notes = "",
  onSuccess,
  onError,
  handleAddToWishlist,
}) => {
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      let response;

      if (wishlistType === "fromWishlist") {
        const wishlistData = await handleAddToWishlist();
        if (!wishlistData) {
          throw new Error("No wishlist data returned.");
        }
        response = await createWishlistPost(wishlistData);
      } else if (wishlistType === "fromPost") {
        // Fetch post details using postId
        const postDetails = await getPostById(postId);
        if (!postDetails) {
          throw new Error("Failed to fetch post details.");
        }

        // Extract relevant data from post details
        const wishlistData = {
          userId,
          year: parseInt(postDetails.year),
          brandId: postDetails.brandId,
          model: postDetails.model,
          notes,
        };

        // Create new wishlist object
        response = await createWishlistPost(wishlistData);
      } else {
        throw new Error("Invalid wishlist type.");
      }

      onSuccess(response);
      navigate(`/wishlist/${userId}`);
    } catch (error) {
      onError(error.message);
    }
  };

  return (
    <button onClick={handleClick} className="btn btn-primary">
      Add to Wishlist
    </button>
  );
};
