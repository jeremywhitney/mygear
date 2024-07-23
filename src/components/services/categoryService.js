export const getCategories = async () => {
  const response = await fetch(`http://localhost:8088/categories`);
  return await response.json();
};
