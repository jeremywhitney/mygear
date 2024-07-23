export const CategoryDropdown = ({
  categories = [],
  selectedCategory,
  setSelectedCategory,
}) => {
  return (
    <select
      className="filter-dropdown"
      value={selectedCategory}
      onChange={(e) => setSelectedCategory(e.target.value)}
    >
      <option value="">All Categories</option>
      {categories.map((category) => (
        <option key={category.id} value={category.id}>
          {category.name}
        </option>
      ))}
    </select>
  );
};
