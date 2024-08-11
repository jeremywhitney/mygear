import { useEffect, useState } from "react";
import { CategoryDropdown } from "../dropdowns/CategoryDropdown";
import { ConditionDropdown } from "../dropdowns/ConditionDropdown";
import { ForSaleFilter } from "../filter/ForSaleFilter";
import { BrandInput } from "../inputs/BrandInput";
import "./GearForm.css";

export const GearForm = ({
  currentUser,
  gear = {},
  handleSubmit,
  categories = [],
  conditions = [],
  initialData = {},
}) => {
  const [brand, setBrand] = useState(gear.brand || "");
  const [brandId, setBrandId] = useState(gear.brandId || "");
  const [category, setCategory] = useState(gear.category || "");
  const [condition, setCondition] = useState(gear.condition || "");
  const [model, setModel] = useState(gear.model || "");
  const [year, setYear] = useState(gear.year || "");
  const [description, setDescription] = useState(gear.description || "");
  const [image, setImage] = useState(gear.image || "");
  const [forSale, setForSale] = useState(gear.forSale || false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (Object.keys(initialData).length > 0) {
      setBrand(initialData.brand.name || "");
      setBrandId(initialData.brandId || "");
      setCategory(initialData.categoryId || "");
      setCondition(initialData.conditionId || "");
      setModel(initialData.model || "");
      setYear(initialData.year || "");
      setForSale(initialData.forSale || false);
      setDescription(initialData.description || "");
      setImage(initialData.image || "");
    }
  }, [initialData]);

  const onSubmit = (event) => {
    event.preventDefault();

    // Basic validation
    const newErrors = {};
    if (!brand) newErrors.brand = "Brand is required";
    if (!category) newErrors.category = "Category is required";
    if (!model) newErrors.model = "Model is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      const formData = {
        userId: currentUser.id,
        brandId: parseInt(brandId),
        categoryId: parseInt(category),
        conditionId: parseInt(condition) || "",
        model,
        year: parseInt(year),
        forSale,
        description,
        image,
        timestamp: new Date().toISOString().split("T")[0],
      };
      handleSubmit(formData);
    }
  };

  return (
    <form onSubmit={onSubmit} className="container mt-4 gear-form-container">
      <div className="row">
        <div className="col-lg-4 mb-3 gear-form-category">
          <CategoryDropdown
            categories={categories}
            selectedCategory={category}
            setSelectedCategory={setCategory}
          />
          {errors.category && <p className="text-danger">{errors.category}</p>}
        </div>
        <div className="col-lg-4 mb-3 gear-form-condition">
          <ConditionDropdown
            conditions={conditions}
            selectedCondition={condition}
            setSelectedCondition={setCondition}
          />
        </div>
        <div className="col-lg-4 mb-3 gear-form-for-sale">
          <ForSaleFilter forSale={forSale} setForSale={setForSale} />
        </div>
      </div>

      <div className="row">
        <div className="col-lg-6 mb-3 gear-form-brand">
          <BrandInput
            brand={brand}
            setBrand={setBrand}
            onBrandChange={setBrandId}
          />
          {errors.brand && <p className="text-danger">{errors.brand}</p>}
        </div>

        <div className="col-lg-6 mb-3 gear-form-model">
          <label htmlFor="model" className="form-label">
            <strong>Model:</strong>
          </label>
          <input
            type="text"
            autoComplete="off"
            className="form-control"
            id="model"
            value={model}
            onChange={(e) => setModel(e.target.value)}
          />
          {errors.model && <p className="text-danger">{errors.model}</p>}
        </div>
      </div>

      <div className="mb-3 gear-form-description">
        <label htmlFor="description" className="form-label">
          <strong>Description:</strong>
        </label>
        <textarea
          type="text"
          className="form-control"
          id="description"
          autoComplete="off"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>

      <div className="mb-3 gear-form-image">
        <label htmlFor="image" className="form-label">
          <strong>Image URL:</strong>
        </label>
        <input
          type="text"
          autoComplete="off"
          className="form-control"
          id="image"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
      </div>

      <div className="text-center">
        <button className="btn btn-primary gear-form-save-button" type="submit">
          Save
        </button>
      </div>
    </form>
  );
};
