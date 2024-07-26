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

export const getPostsByUserId = async (userId) => {
  const response = await fetch(`http://localhost:8088/posts?userId=${userId}`)
  return await response.json()
}

export const createGearPost = async (gearData) => {
  const response = await fetch(`http://localhost:8088/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(gearData),
  });
  if (!response.ok) {
    throw new Error("Error creating gear post");
  }
  const newPost = await response.json();
  return newPost;
};

export const editGearPost = async (postId, updatedPost) => {
  return fetch(`http://localhost:8088/posts/${postId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedPost),
  }).then((response) => response.json());
};

export const deleteGearPost = async (postId) => {
  return fetch(`http://localhost:8088/posts/${postId}`, {
    method: "DELETE",
  });
};
