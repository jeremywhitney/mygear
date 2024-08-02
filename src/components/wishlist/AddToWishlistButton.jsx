import { useNavigate } from "react-router-dom";
import { createWFPPost, createWFWPost } from "../services/wishlistService";

export const AddToWishlistButton = ({
  userId,
  postId,
  wishlistType,
  year,
  brandId,
  model,
  notes = "",
  onSuccess,
  onError,
  handleAddToWishlist,
}) => {
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      let response;
      const wishlistData = await handleAddToWishlist();

      if (!wishlistData) {
        throw new Error("No wishlist data returned.");
      }

      if (wishlistType === "fromWishlist")
        response = await createWFWPost(wishlistData);
      else if (wishlistType === "fromPost")
        response = await createWFPPost(wishlistData);

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
