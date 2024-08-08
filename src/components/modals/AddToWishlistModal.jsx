import { useEffect, useState } from "react";
import { addBrand, getBrands } from "../services/brandService.js";
import { AddToWishlistButton } from "../wishlist/AddToWishlistButton.jsx";
import { WishlistModal } from "./WishlistModal.jsx";

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
    <WishlistModal
      isOpen={isOpen}
      onClose={onClose}
      footerButtons={
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
          onClick={onClose}
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
            onChange={(event) => {
              setYear(event.target.value);
              setFilteredBrandSuggestions([]);
            }}
            autoComplete="off"
          />
        </div>
        <div className="mb-3 position-relative">
          <label htmlFor="brand" className="form-label">
            <strong>Brand:</strong>
          </label>
          <input
            className="form-control"
            type="text"
            id="brand"
            value={brand}
            onChange={handleBrandChange}
            onBlur={() =>
              setTimeout(() => setFilteredBrandSuggestions([]), 100)
            }
            autoComplete="off"
          />
          {filteredBrandSuggestions.length > 0 && (
            <ul className="list-group position-absolute w-100">
              {filteredBrandSuggestions.map((b) => (
                <li
                  key={b.id}
                  className="list-group-item"
                  onClick={() => handleBrandSelect(b.name)}
                >
                  {b.name}
                </li>
              ))}
            </ul>
          )}
          {newBrand && (
            <p className="text-danger mt-1">
              This brand is not in our list. It will be added.
            </p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="model" className="form-label">
            <strong>Model:</strong>
          </label>
          <input
            className="form-control"
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
        <div className="mb-3">
          <label htmlFor="notes" className="form-label">
            <strong>Notes:</strong>
          </label>
          <input
            className="form-control"
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
        {error && <p className="text-danger">{error}</p>}
      </div>
    </WishlistModal>
  );
};
