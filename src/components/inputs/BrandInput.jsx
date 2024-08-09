import { useState, useEffect } from "react";
import { useBrands } from "../utilities/useBrands.jsx";

export const BrandInput = ({ brand, setBrand }) => {
  const { brands } = useBrands();
  const [filteredBrandSuggestions, setFilteredBrandSuggestions] = useState([]);
  const [newBrand, setNewBrand] = useState(false);

  const handleBrandChange = (event) => {
    const input = event.target.value;
    setBrand(input);

    if (input) {
      const filteredBrands = brands.filter((b) =>
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
    setNewBrand(false);
  };

  useEffect(() => {
    if (brand) {
      const filteredBrands = brands.filter((b) =>
        b.name.toLowerCase().includes(brand.toLowerCase())
      );
      setFilteredBrandSuggestions(filteredBrands);
      setNewBrand(filteredBrands.length === 0);
    } else {
      setFilteredBrandSuggestions([]);
      setNewBrand(false);
    }
  }, [brand, brands]);

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
        onChange={handleBrandChange}
        onBlur={() => setTimeout(() => setFilteredBrandSuggestions([]), 100)}
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
      {brand && newBrand && filteredBrandSuggestions.length === 0 && (
        <p className="text-danger mt-1">
          This brand is not in our list. It will be added.
        </p>
      )}
    </div>
  );
};
