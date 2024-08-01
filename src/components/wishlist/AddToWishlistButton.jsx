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
}) => {
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      let response;
      if (wishlistType === "fromWishlist") {
        const wishlistPost = {
          userId: userId,
          year: parseInt(year),
          brandId: brandId,
          model: model,
          notes: notes,
        };
        response = await createWFWPost(wishlistPost);
      } else if (wishlistType === "fromPost") {
        const wishlistPost = {
          userId: userId,
          postId: parseInt(postId),
          notes: notes,
        };
        response = await createWFPPost(wishlistPost);
      }
      onSuccess(response);
      navigate(`/wishlist/${userId}`)
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
