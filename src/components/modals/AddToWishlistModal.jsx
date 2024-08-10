import { useEffect, useState } from "react";
import { AddToWishlistButton } from "../wishlist/AddToWishlistButton.jsx";
import { WishlistModal } from "./WishlistModal.jsx";
import { BrandInput } from "../inputs/BrandInput.jsx";

export const AddToWishlistModal = ({ isOpen, onClose, userId, onAdd }) => {
  // State to hold form input values
  const [year, setYear] = useState("");
  const [brand, setBrand] = useState("");
  const [brandId, setBrandId] = useState(null); // Track brandId directly from Brand Input
  const [model, setModel] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");

  // Function to handle adding an item to the wishlist
  const handleAddToWishlist = async () => {
    // If brandId is null or undefined, set an error message
    if (!brandId) {
      setError("Brand ID is null or undefined.");
      return;
    }

    // Return the wishlist data object
    return {
      userId,
      year: parseInt(year),
      brandId,
      model,
      notes,
    };
  };

  return (
    <WishlistModal
      isOpen={isOpen} // Prop to control the visibility of the modal
      onClose={onClose} // Function to close the modal
      footerButtons={
        <AddToWishlistButton
          userId={userId}
          wishlistType="fromWishlist"
          year={year}
          brandId={brandId}
          model={model}
          notes={notes}
          onSuccess={() => {
            // If successful, call the onAdd callback, close the modal, and reset form inputs and error
            onAdd();
            onClose();
            setYear("");
            setBrand("");
            setModel("");
            setNotes("");
            setError("");
          }}
          onError={(message) => setError(message)} // Handle error messages
          handleAddToWishlist={handleAddToWishlist} // Pass the handleAddToWishlist function
        />
      }
    >
      <div className="modal-header">
        <h5 className="modal-title">
          <strong>Add to Wishlist</strong>
        </h5>
        <button
          type="button"
          className="btn-close"
          aria-label="Close"
          onClick={onClose} // Close button in the modal header
        ></button>
      </div>
      <div className="modal-body">
        <div className="mb-3">
          <label htmlFor="year" className="form-label">
            <strong>Year:</strong>
          </label>
          <input
            className="form-control"
            type="text"
            id="year"
            value={year}
            onChange={(event) => setYear(event.target.value)} // Update year state when input changes
            autoComplete="off"
          />
        </div>
        {/* Reusable BrandInput component for selecting or adding a brand */}
        <BrandInput
          brand={brand}
          setBrand={setBrand}
          onBrandChange={setBrandId} // Use callback to set brandId
        />
        <div className="mb-3">
          <label htmlFor="model" className="form-label">
            <strong>Model:</strong>
          </label>
          <input
            className="form-control"
            type="text"
            id="model"
            value={model}
            onChange={(event) => setModel(event.target.value)} // Update model state when input changes
            autoComplete="off"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="notes" className="form-label">
            <strong>Notes:</strong>
          </label>
          <input
            className="form-control"
            type="text"
            id="notes"
            value={notes}
            onChange={(event) => setNotes(event.target.value)} // Update notes state when input changes
            autoComplete="off"
          />
        </div>
        {/* Display error message if there's an error */}
        {error && <p className="text-danger">{error}</p>}
      </div>
    </WishlistModal>
  );
};
