import { useEffect, useState } from "react";
import {
  deleteWFWPost,
  deleteWFPPost,
  getCombinedWFWPosts,
  getCombinedWFPPosts,
} from "../services/wishlistService";

export const Wishlist = ({ currentUser }) => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWishlistItems = async () => {
      try {
        // Fetch and combine both types of wishlist items
        const [wfwItems, wfpItems] = await Promise.all([
          getCombinedWFWPosts(),
          getCombinedWFPPosts(),
        ]);
        setWishlistItems([...wfwItems, ...wfpItems]);
      } catch (err) {
        setError("Failed to fetch wishlist items.");
      } finally {
        setLoading(false);
      }
    };
    fetchWishlistItems();
  }, []);

  const handleDelete = async (id, type) => {
    try {
      if (type === "fromWishlist") {
        await deleteWFWPost(id);
      } else if (type === "fromPost") {
        await deleteWFPPost(id);
      }
      // Update state after deletion
      setWishlistItems((prevItems) =>
        prevItems.filter((item) => item.id !== id || item.type !== type)
      );
    } catch (err) {
      setError("Failed to delete wishlist item.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="wishlist-container">
      <h1>My Wishlist</h1>
      {wishlistItems.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <ul>
          {wishlistItems.map((item) => (
            <li key={`${item.id}-${item.type}`} className="wishlist-item">
              <p>
                {item.type === "fromWishlist" ? (
                  <>
                    <strong>{item.year}</strong> {item.brand?.name} {item.model}
                  </>
                ) : (
                  <>
                    <strong>{item.post?.year}</strong> {item.post?.brand?.name}{" "}
                    {item.post?.model}{" "}
                  </>
                )}
              </p>
              <p>
                <em>Notes: {item.notes}</em>
              </p>
              <div className="wishlist-item-actions">
                <button
                  className="remove-button"
                  onClick={() => handleDelete(item.id, item.type)}
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
