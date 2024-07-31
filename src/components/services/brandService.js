export const getBrands = async () => {
  const response = await fetch(`http://localhost:8088/brands`);
  return await response.json();
};

export const addBrand = async (brand) => {
  const response = await fetch("http://localhost:8088/brands", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(brand),
  });
  return await response.json();
};