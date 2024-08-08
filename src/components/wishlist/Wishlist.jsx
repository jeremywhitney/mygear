import { useEffect, useState } from "react";
import {
  deleteWishlistPost,
  getCombinedWishlistPosts,
} from "../services/wishlistService";
import { AddToWishlistModal } from "../modals/AddToWishlistModal.jsx";
import { EditWishlistModal } from "../modals/EditWishlistModal.jsx";

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
    <div className="container wishlist-container my-4">
      <h1 className="text-center wishlist-title mb-4">My Wishlist</h1>
      <button
        className="wishlist-add-btn btn btn-primary mb-4"
        onClick={openAddModal}
      >
        Add to Wishlist
      </button>
      {wishlistItems.length === 0 ? (
        <p className="wishlist-empty-text">Your wishlist is empty.</p>
      ) : (
        <div className="wishlist-table">
          <div className="row wishlist-header">
            <div className="col-1 table-year">
              <strong>Year</strong>
            </div>
            <div className="col-2 table-brand">
              <strong>Brand</strong>
            </div>
            <div className="col-3 table-model">
              <strong>Model</strong>
            </div>
            <div className="col-6 table-notes">
              <strong>Notes</strong>
            </div>
          </div>
          <ul className="list-group">
            {wishlistItems.map((item) => (
              <li key={item.id} className="list-group-item wishlist-item">
                <div className="row">
                  <div className="col-1 table-year">
                    {item.year || item.post?.year}
                  </div>
                  <div className="col-2 table-brand">
                    {item.brand?.name || item.post?.brand?.name}
                  </div>
                  <div className="col-3 table-model">
                    {item.model || item.post?.model}
                  </div>
                  <div className="col-6 table-notes">
                    <p className="wishlist-notes">
                      <em>{item.notes}</em>
                    </p>
                  </div>
                </div>

                <div className="d-flex justify-content-end">
                  <button
                    className="btn btn-secondary mr-2"
                    onClick={() => openEditModal(item)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => handleDelete(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
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
