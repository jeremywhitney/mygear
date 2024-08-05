import { useEffect, useState } from "react";
import {
  deleteWishlistPost,
  getCombinedWishlistPosts,
} from "../services/wishlistService";
import { AddToWishlistModal } from "../forms/AddToWishlistModal.jsx";
import { EditWishlistModal } from "../forms/EditWishlistModal.jsx";

export const Wishlist = ({ currentUser }) => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedWishlistItem, setSelectedWishlistItem] = useState(null);

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

  const openAddModal = () => setIsAddModalOpen(true);
  const closeAddModal = () => setIsAddModalOpen(false);

  const openEditModal = (item) => {
    setSelectedWishlistItem(item);
    setIsEditModalOpen(true);
  };
  const closeEditModal = () => setIsEditModalOpen(false);

  const handleEdit = async () => {
    await fetchWishlistItems();
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
      <button className="add-to-wishlist-button" onClick={openAddModal}>
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
                <button
                  className="edit-button"
                  onClick={() => openEditModal(item)}
                >
                  Edit
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <AddToWishlistModal
        isOpen={isAddModalOpen}
        onClose={closeAddModal}
        userId={currentUser.id}
        onAdd={handleAdd}
      />
      {selectedWishlistItem && (
        <EditWishlistModal
          isOpen={isEditModalOpen}
          onClose={closeEditModal}
          userId={currentUser.id}
          wishlistItem={selectedWishlistItem}
          onUpdate={handleEdit}
        />
      )}
    </div>
  );
};
