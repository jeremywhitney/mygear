import { useState } from "react";
import Modal from "react-modal";
import { addBrand } from "../services/brandService";

Modal.setAppElement("#root");

export const AddBrandModal = ({
  isOpen,
  onRequestClose,
  onBrandAdded,
  brands,
}) => {
  const [brandName, setBrandName] = useState("");
  const [error, setError] = useState("");

  const handleInputChange = (event) => {
    setBrandName(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    const newBrandNameLower = brandName.toLowerCase();
    const isDuplicate = brands.some(
      (brand) => brand.name.toLowerCase() === newBrandNameLower
    );

    if (isDuplicate) {
      alert(
        "This brand already exists. Please select from the brand dropdown list."
      );
      return;
    }

    try {
      const newBrand = await addBrand({ name: brandName });
      onBrandAdded(newBrand);
      onRequestClose();
    } catch (err) {
      setError("Failed to add brand. Please try again.");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Add Brand Modal"
      className="modal-dialog"
      overlayClassName="modal-overlay"
    >
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Add New Brand</h5>
          <button type="button" className="btn-close" onClick={onRequestClose}></button>
        </div>
        <div className="modal-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="brandName" className="form-label">Brand Name:</label>
              <input
                className="form-control"
                type="text"
                id="brandName"
                value={brandName}
                onChange={handleInputChange}
                required
              />
            </div>
            {error && <p className="text-danger">{error}</p>}
            <div className="modal-footer">
              <button
                className="btn btn-primary"
                type="submit"
              >
                Add Brand
              </button>
              <button
                className="btn btn-secondary"
                type="button"
                onClick={onRequestClose}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};
