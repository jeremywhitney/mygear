import { useEffect, useState } from "react";
import { AddToWishlistButton } from "../wishlist/AddToWishlistButton.jsx";
import { WishlistModal } from "./WishlistModal.jsx";
import { BrandInput } from "../inputs/BrandInput.jsx";
import { useBrands } from "../utilities/useBrands.jsx";
import { addBrand } from "../services/brandService.js";

export const AddToWishlistModal = ({ isOpen, onClose, userId, onAdd }) => {
  const [year, setYear] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");
  const { brands: initialBrands } = useBrands();
  const [brands, setBrands] = useState(initialBrands);

  useEffect(() => {
    setBrands(initialBrands);
  }, [initialBrands]);

  const handleAddToWishlist = async () => {
    let brandId;

    // Determine if the brand needs to be created
    const existingBrand = brands.find((b) => b.name === brand);
    if (!existingBrand) {
      const createdBrand = await addBrand({ name: brand });
      brandId = createdBrand.id;
      // Update local brand list
      setBrands([...brands, { id: brandId, name: brand }]);
    } else {
      brandId = existingBrand.id;
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
          brandId={brands.find((b) => b.name === brand)?.id}
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
            onChange={(event) => setYear(event.target.value)}
            autoComplete="off"
          />
        </div>
        <BrandInput brand={brand} setBrand={setBrand} />
        <div className="mb-3">
          <label htmlFor="model" className="form-label">
            <strong>Model:</strong>
          </label>
          <input
            className="form-control"
            type="text"
            id="model"
            value={model}
            onChange={(event) => setModel(event.target.value)}
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
            onChange={(event) => setNotes(event.target.value)}
            autoComplete="off"
          />
        </div>
        {error && <p className="text-danger">{error}</p>}
      </div>
    </WishlistModal>
  );
};
