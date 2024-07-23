export const BrandDropdown = ({ brands, selectedBrand, setSelectedBrand }) => {
  return (
    <select
      className="filter-dropdown"
      value={selectedBrand}
      onChange={(e) => setSelectedBrand(e.target.value)}
    >
      <option value="">All Brands</option>
      {brands.map((brand, index) => (
        <option key={index} value={brand}>
          {brand}
        </option>
      ))}
    </select>
  );
};
