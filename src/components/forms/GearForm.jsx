import { useState } from "react";
import { CategoryDropdown } from "../filter/CategoryDropdown";
import { ConditionDropdown } from "../filter/ConditionDropdown";
import { BrandDropdown } from "../filter/BrandDropdown";
import { ForSaleFilter } from "../filter/ForSaleFilter";
import "./Form.css"

export const GearForm = ({
  currentUser, 
  gear = {},
  handleSubmit,
  categories = [],
  conditions = [],
  brands = [],
}) => {
  const [category, setCategory] = useState(gear.category || "");
  const [condition, setCondition] = useState(gear.condition || "");
  const [brand, setBrand] = useState(gear.brand || "");
  const [year, setYear] = useState(gear.year || "");
  const [model, setModel] = useState(gear.model || "");
  const [description, setDescription] = useState(gear.description || "");
  const [image, setImage] = useState(gear.image || "");
  const [forSale, setForSale] = useState(gear.forSale || false);
  const [errors, setErrors] = useState({});

  const onSubmit = (event) => {
    event.preventDefault();

    // Basic validation
    const newErrors = {};
    if (!category) newErrors.category = "Category is required";
    if (!brand) newErrors.brand = "Brand is required";
    if (!model) newErrors.model = "Model is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      const formData = {
        userId: currentUser.id,
        brandId: parseInt(brand),
        categoryId: parseInt(category),
        conditionId: parseInt(condition),
        model,
        year,
        forSale,
        description,
        image,
      };
      handleSubmit(formData);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <CategoryDropdown
        categories={categories}
        selectedCategory={category}
        setSelectedCategory={setCategory}
      />
      {errors.category && <p>{errors.category}</p>}

      <ConditionDropdown
        conditions={conditions}
        selectedCondition={condition}
        setSelectedCondition={setCondition}
      />

      <BrandDropdown
        brands={brands}
        selectedBrand={brand}
        setSelectedBrand={setBrand}
      />
      {errors.brand && <p>{errors.brand}</p>}

      <ForSaleFilter forSale={forSale} setForSale={setForSale} />

      <div>
        <label>Year:</label>
        <input
          type="text"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
      </div>
      <div>
        <label>Model:</label>
        <input
          type="text"
          value={model}
          onChange={(e) => setModel(e.target.value)}
        />
        {errors.model && <p>{errors.model}</p>}
      </div>
      <div>
        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>
      <div>
        <label>Image URL:</label>
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
      </div>
      <button type="submit">Save</button>
    </form>
  );
};