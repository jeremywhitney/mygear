import { useEffect, useState } from "react";
import Modal from "react-modal";
import { addBrand, getBrands } from "../services/brandService";
import { AddToWishlistButton } from "../wishlist/AddToWishlistButton.jsx";

export const AddToWishlistModal = ({ isOpen, onClose, userId, onAdd }) => {
  const [year, setYear] = useState("");
  const [brand, setBrand] = useState("");
  const [brandSuggestions, setBrandSuggestions] = useState([]);
  const [filteredBrandSuggestions, setFilteredBrandSuggestions] = useState([]);
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

  const handleBrandChange = (event) => {
    const input = event.target.value;
    setBrand(input);

    if (input) {
      const filteredBrands = brandSuggestions.filter((b) =>
        b.name.toLowerCase().includes(input.toLowerCase())
      );
      setFilteredBrandSuggestions(filteredBrands);
      setNewBrand(filteredBrands.length === 0);
    } else {
      setFilteredBrandSuggestions([]);
      setNewBrand(false);
    }
  };

  const handleBrandSelect = (brandName) => {
    setBrand(brandName);
    setFilteredBrandSuggestions([]);
  };

  const handleAddToWishlist = async () => {
    let brandId;

    if (newBrand) {
      const createdBrand = await addBrand({ name: brand });
      brandId = createdBrand.id;
    } else {
      const existingBrand = brandSuggestions.find((b) => b.name === brand);
      brandId = existingBrand ? existingBrand.id : null;
    }

    if (!brandId) {
      setError("Brand ID is null or undefined.");
      return;
    }

    return {
      userId,
      year: parseInt(year),
      brandId,
      model,
      notes,
    };
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
          onChange={(event) => {
            setYear(event.target.value);
            setFilteredBrandSuggestions([]);
          }}
          autoComplete="off"
        />
      </div>
      <div style={{ position: "relative" }}>
        <label htmlFor="brand">Brand:</label>
        <input
          className="modal-input"
          type="text"
          id="brand"
          value={brand}
          onChange={handleBrandChange}
          onBlur={() => setTimeout(() => setFilteredBrandSuggestions([]), 100)}
          autoComplete="off"
        />
        {filteredBrandSuggestions.length > 0 && (
          <ul className="suggestions-list">
            {filteredBrandSuggestions.map((b) => (
              <li key={b.id} onClick={() => handleBrandSelect(b.name)}>
                {b.name}
              </li>
            ))}
          </ul>
        )}
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
          onChange={(event) => {
            setModel(event.target.value);
            setFilteredBrandSuggestions([]);
          }}
          autoComplete="off"
        />
      </div>
      <div>
        <label htmlFor="notes">Notes:</label>
        <input
          className="modal-input"
          type="text"
          id="notes"
          value={notes}
          onChange={(event) => {
            setNotes(event.target.value);
            setFilteredBrandSuggestions([]);
          }}
          autoComplete="off"
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
          setFilteredBrandSuggestions([]);
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
