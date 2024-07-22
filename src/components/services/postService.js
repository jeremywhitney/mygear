export const getAllPostsWithUserAndBrand = async () => {
  const response = await fetch(`http://localhost:8088/posts?_expand=user&_expand=brand`);
  return await response.json();
};
