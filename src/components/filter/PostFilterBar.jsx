// import { BrandDropdown } from "./BrandDropdown";
// import { CategoryDropdown } from "./CategoryDropdown";
// import { ForSaleFilter } from "./ForSaleFilter";

// export const PostFilterBar = ({
//   categories,
//   selectedCategory,
//   setSelectedCategory,
//   brands,
//   selectedBrand,
//   setSelectedBrand,
//   forSale,
//   setForSale,
// }) => {
//   return (
//     <div className="filter-bar">
//       <CategoryDropdown
//         categories={categories}
//         selectedCategory={selectedCategory}
//         setSelectedCategory={setSelectedCategory}
//       />
//       <BrandDropdown
//         brands={brands}
//         selectedBrand={selectedBrand}
//         setSelectedBrand={setSelectedBrand}
//       />
//       <ForSaleFilter forSale={forSale} setForSale={setForSale} />
//     </div>
//   );
// };


// BOOTSTRAP //
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
  forSale,
  setForSale,
}) => {
  return (
    <div className="container">
      <div className="row justify-content-center align-items-center g-3">
        <div className="col-auto">
          <CategoryDropdown
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </div>
        <div className="col-auto">
          <BrandDropdown
            brands={brands}
            selectedBrand={selectedBrand}
            setSelectedBrand={setSelectedBrand}
          />
        </div>
        <div className="col-auto">
          <ForSaleFilter forSale={forSale} setForSale={setForSale} />
        </div>
      </div>
    </div>
  );
};

