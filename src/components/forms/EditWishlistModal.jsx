// import { useEffect, useState } from "react";
// import { WishlistModal } from "./WishlistModal.jsx";
// import { editWishlistPost } from "../services/wishlistService.js";

// export const EditWishlistModal = ({
//   isOpen,
//   onClose,
//   userId,
//   wishlistItem,
//   onUpdate,
// }) => {
//   const [year, setYear] = useState("");
//   const [notes, setNotes] = useState("");
//   const [error, setError] = useState("");

//   useEffect(() => {
//     if (wishlistItem) {
//       setYear(wishlistItem.year || "");
//       setNotes(wishlistItem.notes || "");
//     }
//   }, [wishlistItem]);

//   const handleEditWishlistItem = async () => {
//     const updatedItem = {
//       id: wishlistItem.id,
//       userId,
//       year: parseInt(year),
//       brandId: wishlistItem.brand.id,
//       model: wishlistItem.model,
//       notes,
//     };

//     try {
//       await editWishlistPost(updatedItem);
//       onUpdate();
//       onClose();
//     } catch (err) {
//       setError("Failed to update wishlist item.");
//     }
//   };

//   return (
//     <WishlistModal isOpen={isOpen} onClose={onClose}>
//       <h2>Edit Wishlist Item</h2>
//       <div>
//         <label htmlFor="year">Year:</label>
//         <input
//           className="modal-input"
//           type="text"
//           id="year"
//           value={year}
//           onChange={(event) => {
//             setYear(event.target.value);
//           }}
//           autoComplete="off"
//         />
//       </div>
//       <div>
//         <label>Brand:</label>
//         <p>{wishlistItem.brand.name}</p>
//       </div>
//       <div>
//         <label>Model:</label>
//         <p>{wishlistItem.model}</p>
//       </div>
//       <div>
//         <label htmlFor="notes">Notes:</label>
//         <input
//           className="modal-input"
//           type="text"
//           id="notes"
//           value={notes}
//           onChange={(event) => {
//             setNotes(event.target.value);
//           }}
//           autoComplete="off"
//         />
//       </div>
//       {error && <p className="error">{error}</p>}
//       <button onClick={handleEditWishlistItem}>Save Changes</button>
//     </WishlistModal>
//   );
// };


// BOOTSTRAP //
import { useEffect, useState } from "react";
import { WishlistModal } from "./WishlistModal.jsx";
import { editWishlistPost } from "../services/wishlistService.js";

export const EditWishlistModal = ({
  isOpen,
  onClose,
  userId,
  wishlistItem,
  onUpdate,
}) => {
  const [year, setYear] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (wishlistItem) {
      setYear(wishlistItem.year || "");
      setNotes(wishlistItem.notes || "");
    }
  }, [wishlistItem]);

  const handleEditWishlistItem = async () => {
    const updatedItem = {
      id: wishlistItem.id,
      userId,
      year: parseInt(year),
      brandId: wishlistItem.brand.id,
      model: wishlistItem.model,
      notes,
    };

    try {
      await editWishlistPost(updatedItem);
      onUpdate();
      onClose();
    } catch (err) {
      setError("Failed to update wishlist item.");
    }
  };

  return (
    <WishlistModal isOpen={isOpen} onClose={onClose}>
      <div className="modal-header">
        <h5 className="modal-title">Edit Wishlist Item</h5>
        <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
      </div>
      <div className="modal-body">
        <div className="mb-3">
          <label htmlFor="year" className="form-label">Year:</label>
          <input
            className="form-control"
            type="text"
            id="year"
            value={year}
            onChange={(event) => {
              setYear(event.target.value);
            }}
            autoComplete="off"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Brand:</label>
          <p>{wishlistItem.brand.name}</p>
        </div>
        <div className="mb-3">
          <label className="form-label">Model:</label>
          <p>{wishlistItem.model}</p>
        </div>
        <div className="mb-3">
          <label htmlFor="notes" className="form-label">Notes:</label>
          <input
            className="form-control"
            type="text"
            id="notes"
            value={notes}
            onChange={(event) => {
              setNotes(event.target.value);
            }}
            autoComplete="off"
          />
        </div>
        {error && <p className="text-danger">{error}</p>}
      </div>
      <div className="modal-footer">
        <button className="btn btn-primary" onClick={handleEditWishlistItem}>Save Changes</button>
      </div>
    </WishlistModal>
  );
};
