import { useEffect, useState } from "react";
import { getBrands } from "../services/brandService";

export const useBrands = () => {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    const fetchBrands = async () => {
      const fetchedBrands = await getBrands();
      setBrands(fetchedBrands);
    };
    fetchBrands();
  }, []);

  return { brands };
};