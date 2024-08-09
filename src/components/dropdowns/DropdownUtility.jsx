import { useEffect, useState } from "react";
import { getBrands } from "../services/brandService";
import { getCategories } from "../services/categoryService";
import { getConditions } from "../services/conditionService";

export const DropdownUtility = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [conditions, setConditions] = useState([]);
  const [brands, setBrands] = useState([]);

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

  return children({ categories, conditions, brands });
};
