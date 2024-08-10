import { useState, useEffect } from "react";
import { useBrands } from "../utilities/useBrands.jsx";
import { addBrand } from "../services/brandService.js";

export const BrandInput = ({ brand, setBrand, onBrandChange }) => {
  const { brands } = useBrands(); // Fetching all brands from the custom hook `useBrands`
  const [filteredBrandSuggestions, setFilteredBrandSuggestions] = useState([]); // State to store filtered brand suggestions based on user input
  const [newBrand, setNewBrand] = useState(false); // State to track if the entered brand is new (not in the existing list)

  // Function to handle user input in the brand text field
  const handleBrandChange = (event) => {
    const input = event.target.value;
    setBrand(input); // Update the `brand` state with user input

    // If there's input, filter the brands to find matching suggestions
    if (input) {
      const normalizedInput = input.toLowerCase();
      const filteredBrands = brands.filter((b) =>
        b.name.toLowerCase().includes(normalizedInput)
      );

      setFilteredBrandSuggestions(filteredBrands); // Set the filtered brands as suggestions

      // Check if any filtered brand matches the input exactly
      const matchingBrand = filteredBrands.find(
        (b) => b.name.toLowerCase() === normalizedInput
      );

      if (matchingBrand) {
        // Update the input to match the case of the existing brand
        setBrand(matchingBrand.name);
        setNewBrand(false);
        onBrandChange(matchingBrand.id); // Pass the ID of the existing brand
      } else {
        setNewBrand(filteredBrands.length === 0); // Determine if it's a new brand
      }
    } else {
      setFilteredBrandSuggestions([]); // Clear suggestions if input is empty
      setNewBrand(false); // Reset new brand flag
      onBrandChange(null); // Notify parent component that brand is cleared
    }
  };

  const handleCreateBrand = async () => {
    if (newBrand) {
      const createdBrand = await addBrand({ name: brand });
      setFilteredBrandSuggestions([createdBrand]); // Set the new brand as the suggestion
      setNewBrand(false);
      onBrandChange(createdBrand.id); // Pass the new brand ID to the parent component
    }
  };

  // Function to handle the selection of a brand from the suggestions
  const handleBrandSelect = (brandName) => {
    setBrand(brandName); // Set the selected brand as the input value
    setFilteredBrandSuggestions([]); // Clear the suggestions
    setNewBrand(false); // Reset new brand flag

    const selectedBrand = brands.find(
      (b) => b.name.toLowerCase() === brandName.toLowerCase()
    );
    if (selectedBrand) {
      onBrandChange(selectedBrand.id); // Pass the selected brand ID to the parent compoent
    }
  };

  // Effect that runs whenever the `brand` or `brands` state changes
  useEffect(() => {
    if (brand) {
      // Update suggestions when the brand changes
      const normalizedBrand = brand.toLowerCase();
      const filteredBrands = brands.filter((b) =>
        b.name.toLowerCase().includes(normalizedBrand)
      );
      setFilteredBrandSuggestions(filteredBrands); // Update suggestions
      setNewBrand(filteredBrands.length === 0); // Determine if it's a new brand
    } else {
      setFilteredBrandSuggestions([]); // Clear suggestions if input is empty
      setNewBrand(false); // Reset new brand flag
    }
  }, [brand, brands]); // Dependencies: re-run effect when `brand` or `brands` changes

  return (
    <div className="mb-3 position-relative">
      <label htmlFor="brand" className="form-label">
        <strong>Brand:</strong>
      </label>
      <input
        className="form-control"
        type="text"
        id="brand"
        value={brand}
        onChange={handleBrandChange} // Handle user input changes
        onBlur={() => setTimeout(() => setFilteredBrandSuggestions([]), 100)} // Clear suggestions on blur with a delay
        autoComplete="off"
      />
      {/* Display suggestions if there are any */}
      {filteredBrandSuggestions.length > 0 && (
        <ul className="list-group position-absolute w-100">
          {filteredBrandSuggestions.map((b) => (
            <li
              key={b.id}
              className="list-group-item"
              onClick={() => handleBrandSelect(b.name)} // Handle suggestion selection
            >
              {b.name}
            </li>
          ))}
        </ul>
      )}
      {/* If the brand is new and no suggestions match, show this message */}
      {brand && newBrand && filteredBrandSuggestions.length === 0 && (
        <div>
          <p className="text-danger mt-1">
            This brand is not in our list. Would you like to add it?
          </p>
          <button
            type="button"
            className="btn btn-primary mt-1"
            onClick={handleCreateBrand}
          >
            Add Brand
          </button>
        </div>
      )}
    </div>
  );
};
