export const BrandDropdown = ({
  brands = [],
  selectedBrand,
  setSelectedBrand,
}) => {
  const sortedBrands = [...brands].sort((a, b) => a.name.localeCompare(b.name));
  return (
    <select
      className="filter-dropdown"
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

