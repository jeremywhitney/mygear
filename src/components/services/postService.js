export const getAllPosts = async () => {
  const response = await fetch(`http://localhost:8088/posts?_expand=user&_expand=brand&_expand=category`);
  return await response.json();
};
