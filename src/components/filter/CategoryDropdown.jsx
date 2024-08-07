export const CategoryDropdown = ({
  categories = [],
  selectedCategory,
  setSelectedCategory,
}) => {
  const sortedCategories = [...categories].sort((a, b) =>
    a.name.localeCompare(b.name)
  );
  return (
    <select
      className="form-select"
      value={selectedCategory}
      onChange={(e) => setSelectedCategory(e.target.value)}
    >
      <option value="">Select a Category</option>
      {sortedCategories.map((category) => (
        <option key={category.id} value={category.id}>
          {category.name}
        </option>
      ))}
    </select>
  );
};