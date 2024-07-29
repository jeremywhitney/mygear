import { useState } from "react";
import Modal from "react-modal";
import { addBrand } from "../services/brandService";
import "./Form.css";

Modal.setAppElement("#root");

export const AddBrandModal = ({ isOpen, onRequestClose, onBrandAdded }) => {
  const [brandName, setBrandName] = useState("");
  const [error, setError] = useState("");

  const handleInputChange = (event) => {
    setBrandName(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

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
      className="ReactModal__Content"
      overlayClassName="ReactModal__Overlay"
    >
      <h2>Add New Brand</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="brandName">Brand Name:</label>
          <input
            type="text"
            id="brandName"
            value={brandName}
            onChange={handleInputChange}
            required
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="button" onClick={handleSubmit}>
          Add Brand
        </button>
        <button type="button" onClick={onRequestClose}>
          Cancel
        </button>
      </form>
    </Modal>
  );
};
