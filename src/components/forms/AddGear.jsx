import { useNavigate } from "react-router-dom";
import { createGearPost } from "../services/postService";
import { GearForm } from "./GearForm";
import { useEffect, useState } from "react";
import { getCategories } from "../services/categoryService";
import { getConditions } from "../services/conditionService";
import { getBrands } from "../services/brandService";

export const AddGear = ({ currentUser }) => {
  const navigate = useNavigate();

  // State for dropdowns
  const [categories, setCategories] = useState([]);
  const [conditions, setConditions] = useState([]);
  const [brands, setBrands] = useState([]);

  // Fetch data for dropdowns
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedCategories = await getCategories();
        setCategories(fetchedCategories);
        const fetchedConditions = await getConditions();
        setConditions(fetchedConditions);
        const fetchedBrands = await getBrands();
        setBrands(fetchedBrands);
      } catch (error) {
        console.error("Error fetching dropdown data:", error);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (formData) => {
    try {
      await createGearPost(formData);
      navigate("/gear");
    } catch (error) {
      console.error("Errror adding gear:", error);
    }
  };

  return (
    <div>
      <h1>Add Gear to Collection</h1>
      <GearForm
        handleSubmit={handleSubmit}
        currentUser={currentUser}
        categories={categories}
        conditions={conditions}
        brands={brands}
      />
    </div>
  );
};
