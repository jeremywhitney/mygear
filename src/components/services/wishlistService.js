// Fetches all wishlist items in wishlistFromWishlist array
export const getAllWFWPosts = async () => {
    const response = await fetch(`http://localhost:8088/wishlistsFromWishlist?_expand=brand`);
    return await response.json();
  };

// Combine wishlist items from the Wishlist view
export const getCombinedWFWPosts = async () => {
    const wishlistPosts = await getAllWFWPosts();
  
    return wishlistPosts.map(wishlistPost => ({
      ...wishlistPost,
      type: "fromWishlist"
    }));
  };

// Fetches all wishlist items in wishlistFromPost array
export const getAllWFPPosts = async () => {
    const response = await fetch(`http://localhost:8088/wishlistsFromPost`);
    return await response.json();
  };
  
// Fetches all posts to include the brand data
export const getAllPosts = async () => {
const response = await fetch(`http://localhost:8088/posts?_expand=brand`);
return await response.json();
};
  
// Combine wishlist items with post and brand data
export const getCombinedWFPPosts = async () => {
    const [wishlistPosts, posts] = await Promise.all([getAllWFPPosts(), getAllPosts()]);
  
    // Create a map for quick lookups
    const postMap = new Map(posts.map(post => [post.id, post]));
  
    return wishlistPosts.map(wishlistPost => ({
      ...wishlistPost,
      post: postMap.get(wishlistPost.postId) || {},
      type: "fromPost"
    }));
  };

// Creates a new item in the wishlistFromWishlist array when a user adds an item to their wishlist from the Wishlist view
export const createWFWPost = async (wishlistPost) => {
const response = await fetch(`http://localhost:8088/wishlistsFromWishlist/`, {
    method: "POST",
    headers: {
    "Content-Type": "application/json",
    },
    body: JSON.stringify(wishlistPost),
});
return response.json();
};

// Creates a new item in the wishlistFromPost array when a user adds an item to their wishlist from a post
export const createWFPPost = async (wishlistPost) => {
    const response = await fetch(`http://localhost:8088/wishlistsFromPost/`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(wishlistPost),
    });
    return response.json();
    };

// Deletes a wishlist item from the users Wishlist and wishlistFromWishlist array
export const deleteWFWPost = async (wishlistId) => {
return fetch(`http://localhost:8088/wishlistsFromWishlist/${wishlistId}`, {
    method: "DELETE",
});
};
  
// Deletes a wishlist item from the users Wishlist and wishlistFromPost array
export const deleteWFPPost = async (wishlistId) => {
return fetch(`http://localhost:8088/wishlistsFromPost/${wishlistId}`, {
    method: "DELETE",
});
};

/* TODO: Create a PUT or POST function to handle the creation of a new WFW item whenever a post tied to a WFP item is deleted*/
  