export const getBrands = async () => {
    const response = await fetch(`http://localhost:8088/brands`);
    return await response.json();
  };