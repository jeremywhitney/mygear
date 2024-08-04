import { getAllPosts } from "./postService";

// Fetches all wishlist items
export const getAllWishlistPosts = async (userId) => {
  const response = await fetch(`http://localhost:8088/wishlists?userId=${userId}&_expand=brand`);
  return await response.json();
};

// Combines wishlist items with post and brand data, adding a type property
export const getCombinedWishlistPosts = async (userId) => {
  const [wishlistPosts, posts] = await Promise.all([getAllWishlistPosts(userId), getAllPosts()]);

  // Create a map for quick lookups
  const postMap = new Map(posts.map(post => [post.id, post]));

  // Add type: "fromWishlist" or "fromPost" based on postId presence
  return wishlistPosts.map(wishlistPost => {
    const type = wishlistPost.postId ? "fromPost" : "fromWishlist";
    return {
      ...wishlistPost,
      post: type === "fromPost" ? postMap.get(wishlistPost.postId) || {} : {},
      type
    };
  });
};

// Creates a new wishlist item
export const createWishlistPost = async (wishlistPost) => {
  const response = await fetch(`http://localhost:8088/wishlists/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(wishlistPost),
  });
  return response.json();
};

// Deletes a wishlist item
export const deleteWishlistPost = async (wishlistId) => {
  return fetch(`http://localhost:8088/wishlists/${wishlistId}`, {
    method: "DELETE",
  });
};