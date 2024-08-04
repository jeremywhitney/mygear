import { useEffect, useState } from "react";
import {
  deleteWishlistPost,
  getCombinedWishlistPosts,
} from "../services/wishlistService";
import { AddToWishlistModal } from "../forms/AddToWishlistModal.jsx";

export const Wishlist = ({ currentUser }) => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchWishlistItems = async () => {
    try {
      const items = await getCombinedWishlistPosts(currentUser.id);
      setWishlistItems(items);
    } catch (err) {
      setError("Failed to fetch wishlist items.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlistItems();
  }, [currentUser.id]);

  const handleAdd = async () => {
    await fetchWishlistItems();
  };

  const handleDelete = async (id) => {
    try {
      await deleteWishlistPost(id);
      // Update state after deletion
      setWishlistItems((prevItems) =>
        prevItems.filter((item) => item.id !== id)
      );
    } catch (err) {
      setError("Failed to delete wishlist item.");
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="wishlist-container">
      <h1>My Wishlist</h1>
      <button className="add-to-wishlist-button" onClick={openModal}>
        Add to Wishlist
      </button>
      {wishlistItems.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <ul>
          {wishlistItems.map((item) => (
            <li key={item.id} className="wishlist-item">
              <p>
                <strong>{item.year || item.post?.year}</strong>{" "}
                {item.brand?.name || item.post?.brand?.name}{" "}
                {item.model || item.post?.model}
              </p>
              <p>
                <em>Notes: {item.notes}</em>
              </p>
              <div className="wishlist-item-actions">
                <button
                  className="remove-button"
                  onClick={() => handleDelete(item.id)}
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <AddToWishlistModal
        isOpen={isModalOpen}
        onClose={closeModal}
        userId={currentUser.id}
        onAdd={handleAdd}
      />
    </div>
  );
};
