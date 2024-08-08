import { useEffect, useState } from "react";
import { CategoryDropdown } from "../filter/CategoryDropdown";
import { ConditionDropdown } from "../filter/ConditionDropdown";
import { BrandDropdown } from "../filter/BrandDropdown";
import { ForSaleFilter } from "../filter/ForSaleFilter";
import { AddBrandModal } from "../modals/AddBrandModal.jsx";
import "./GearForm.css"

export const GearForm = ({
  currentUser,
  gear = {},
  handleSubmit,
  categories = [],
  conditions = [],
  brands: initialBrands = [],
  initialData = {},
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [brands, setBrands] = useState(initialBrands);

  useEffect(() => {
    if (Object.keys(initialData).length > 0) {
      setCategory(initialData.categoryId || "");
      setCondition(initialData.conditionId || "");
      setBrand(initialData.brandId || "");
      setYear(initialData.year || "");
      setModel(initialData.model || "");
      setDescription(initialData.description || "");
      setImage(initialData.image || "");
      setForSale(initialData.forSale || false);
    }
  }, [initialData]);

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
        conditionId: parseInt(condition) || "",
        model,
        year,
        forSale,
        description,
        image,
        timestamp: new Date().toISOString().split("T")[0],
      };
      handleSubmit(formData);
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    setBrands(initialBrands);
  }, [initialBrands]);

  const handleBrandAdded = (newBrand) => {
    setBrands((prevBrands) => {
      const updatedBrands = [...prevBrands, newBrand];
      return updatedBrands;
    });
    setBrand(newBrand.id);
    closeModal();
  };

  return (
  <form onSubmit={onSubmit} className="container mt-4 gear-form-container">
    <div className="row">
      <div className="col-lg-6 mb-3 gear-form-category">
        <CategoryDropdown
          categories={categories}
          selectedCategory={category}
          setSelectedCategory={setCategory}
        />
        {errors.category && <p className="text-danger">{errors.category}</p>}
      </div>

      <div className="col-lg-6 mb-3 gear-form-brand">
        <BrandDropdown
          brands={brands}
          selectedBrand={brand}
          setSelectedBrand={setBrand}
        />
        <button className="btn btn-link p-0" type="button" onClick={openModal}>
          Add New Brand
        </button>
        {errors.brand && <p className="text-danger">{errors.brand}</p>}
      </div>
    </div>

    <AddBrandModal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      onBrandAdded={handleBrandAdded}
      brands={brands}
    />

    <div className="row">
      <div className="col-lg-6 mb-3 gear-form-year">
        <label htmlFor="year" className="form-label">Year:</label>
        <input
          type="text"
          autoComplete="off"
          className="form-control"
          id="year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
      </div>

      <div className="col-lg-6 mb-3 gear-form-model">
        <label htmlFor="model" className="form-label">Model:</label>
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

    <div className="row">
      <div className="col-lg-6 mb-3 gear-form-condition">
        <ConditionDropdown
          conditions={conditions}
          selectedCondition={condition}
          setSelectedCondition={setCondition}
        />
      </div>

      <div className="col-lg-6 mb-3 gear-form-for-sale">
        <ForSaleFilter forSale={forSale} setForSale={setForSale} />
      </div>
    </div>

    <div className="mb-3 gear-form-description">
      <label htmlFor="description" className="form-label">Description:</label>
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
      <label htmlFor="image" className="form-label">Image URL:</label>
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
