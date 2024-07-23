export const PostFilterBar = ({
  categories,
  selectedCategory,
  setSelectedCategory,
  brands,
  selectedBrand,
  setSelectedBrand,
  showForSale,
  setShowForSale,
}) => {
  return (
    <div className="filter-bar">
      <select
      className="filter-dropdown"
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="">All Categories</option>
        {categories.map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
      </select>
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
      <div>
        <label className="filter-checkbox">
          <input
            type="checkbox"
            checked={showForSale}
            onChange={() => setShowForSale(!showForSale)}
          />
          For Sale
        </label>
      </div>
    </div>
  );
};
