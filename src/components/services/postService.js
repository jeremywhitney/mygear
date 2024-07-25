export const getAllPosts = async () => {
  const response = await fetch(
    `http://localhost:8088/posts?_expand=user&_expand=brand&_expand=category&_expand=condition`
  );
  return await response.json();
};

export const getPostById = async (postId) => {
  const response = await fetch(
    `http://localhost:8088/posts/${postId}?_expand=user&_expand=brand&_expand=condition`
  );
  return await response.json();
};

export const createGearPost = async (gearData) => {
  const response = await fetch(`http://localhost:8088/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(gearData),
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};
