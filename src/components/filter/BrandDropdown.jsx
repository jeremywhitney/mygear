export const BrandDropdown = ({
  brands = [],
  selectedBrand,
  setSelectedBrand,
}) => {
  const sortedBrands = [...brands].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <select
      className="form-select"
      value={selectedBrand}
      onChange={(e) => setSelectedBrand(e.target.value)}
    >
      <option value="">All Brands</option>
      {sortedBrands.map((brand) => (
        <option key={brand.id} value={brand.id}>
          {brand.name}
        </option>
      ))}
    </select>
  );
};

