import { useEffect, useState } from "react";
import Modal from "react-modal";
import { addBrand, getBrands } from "../services/brandService";
import { AddToWishlistButton } from "../wishlist/AddToWishlistButton.jsx";

export const AddToWishlistModal = ({ isOpen, onClose, userId, onAdd }) => {
  const [year, setYear] = useState("");
  const [brand, setBrand] = useState("");
  const [brandSuggestions, setBrandSuggestions] = useState([]);
  const [newBrand, setNewBrand] = useState(false);
  const [model, setModel] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const brands = await getBrands();
        setBrandSuggestions(brands);
      } catch (err) {
        setError("Failed to fetch brands.");
      }
    };
    if (isOpen) {
      fetchBrands();
    }
  }, [isOpen]);

  const handleBrandChange = async (event) => {
    const input = event.target.value;
    setBrand(input);

    if (input) {
      const filteredBrands = brandSuggestions.filter((b) =>
        b.name.toLowerCase().includes(input.toLowerCase())
      );
      setBrandSuggestions(filteredBrands);
      setNewBrand(filteredBrands.length === 0);
    } else {
      setNewBrand(false);
    }
  };

  const handleAddToWishlist = async () => {
    try {
      let brandId;

      if (newBrand) {
        const createdBrand = await addBrand({ name: brand });
        brandId = createdBrand.id;
      } else {
        const existingBrand = brandSuggestions.find((b) => b.name === brand);
        brandId = existingBrand ? existingBrand.id : null;
      }

      return {
        userId,
        year,
        brandId,
        model,
        notes,
      };
    } catch (err) {
      setError("Failed to add to wishlist.");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Add to Wishlist Modal"
      className="ReactModal__Content"
      overlayClassName="ReactModal__Overlay"
    >
      <h2>Add to Wishlist</h2>
      <div>
        <label htmlFor="year">Year:</label>
        <input
          className="modal-input"
          type="text"
          id="year"
          value={year}
          onChange={(event) => setYear(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="brand">Brand:</label>
        <input
          className="modal-input"
          type="text"
          id="brand"
          value={brand}
          onChange={handleBrandChange}
        />
        {newBrand && (
          <p className="error">
            This brand is not in our list. It will be added.
          </p>
        )}
      </div>
      <div>
        <label htmlFor="model">Model:</label>
        <input
          className="modal-input"
          type="text"
          id="model"
          value={model}
          onChange={(event) => setModel(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="notes">Notes:</label>
        <input
          className="modal-input"
          type="text"
          id="notes"
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
        />
      </div>
      {error && <p className="error">{error}</p>}
      <AddToWishlistButton
        userId={userId}
        wishlistType="fromWishlist" 
        year={year}
        brandId={
          newBrand ? null : brandSuggestions.find((b) => b.name === brand)?.id
        }
        model={model}
        notes={notes}
        onSuccess={() => {
          onAdd();
          onClose();
          setYear("");
          setBrand("");
          setModel("");
          setNotes("");
          setError("");
          setBrandSuggestions([]);
        }}
        onError={(message) => setError(message)}
        handleAddToWishlist={handleAddToWishlist}
      />
      <button className="cancel-button" type="button" onClick={onClose}>
        Cancel
      </button>
    </Modal>
  );
};
