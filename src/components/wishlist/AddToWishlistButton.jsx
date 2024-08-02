import { useNavigate } from "react-router-dom";
import { createWFPPost, createWFWPost } from "../services/wishlistService";

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
        response = await createWFWPost(wishlistData);
      } else if (wishlistType === "fromPost") {
        const wishlistData = {
          userId,
          postId: parseInt(postId),
          notes,
        };
        response = await createWFPPost(wishlistData);
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
    <button onClick={handleClick} className="add-to-wishlist-btn">
      Add to Wishlist
    </button>
  );
};
