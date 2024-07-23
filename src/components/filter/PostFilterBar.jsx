import { BrandDropdown } from "./BrandDropdown";
import { CategoryDropdown } from "./CategoryDropdown";
import { ForSaleFilter } from "./ForSaleFilter";

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
      <CategoryDropdown
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <BrandDropdown
        brands={brands}
        selectedBrand={selectedBrand}
        setSelectedBrand={setSelectedBrand}
      />
      <ForSaleFilter
        showForSale={showForSale}
        setShowForSale={setShowForSale}
      />
    </div>
  );
};
