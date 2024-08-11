import { useEffect, useState } from "react";
import { getAllPosts } from "../services/postService";
import { SmallPost } from "./SmallPost";
import { PostFilterBar } from "../filter/PostFilterBar";
import { SearchBar } from "../inputs/SearchBar.jsx";

export const AllPosts = ({ currentUser }) => {
  const [allPosts, setAllPosts] = useState([]); // State to store all posts fetched from the server
  const [filteredPosts, setFilteredPosts] = useState([]); // State to store posts after filtering based on user selections
  const [categories, setCategories] = useState([]); // State to store unique categories available from posts
  const [brands, setBrands] = useState([]); // State to store unique brands available from posts
  const [selectedCategory, setSelectedCategory] = useState(""); // State to track the currently selected category for filtering
  const [selectedBrand, setSelectedBrand] = useState(""); // State to track the currently selected brand for filtering
  const [forSale, setForSale] = useState(false); // State to track whether to filter posts by "for sale" status

  // Function to fetch all posts from the server and set initial states
  const getAndSetPosts = async () => {
    // Fetch posts from the server
    const postsArray = await getAllPosts();

    // Sort posts by creation date (newest first)
    postsArray.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    // Set allPosts and filteredPosts state with the sorted posts
    setAllPosts(postsArray);
    setFilteredPosts(postsArray);

    // Extract unique categories from the posts and set categories state
    const categorySet = new Set(postsArray.map((post) => post.category.id));
    const categoryList = Array.from(categorySet).map((id) => {
      return postsArray.find((post) => post.category.id === id).category;
    });
    setCategories(categoryList);

    // Extract unique brands from the posts and set brands state
    const brandSet = new Set(postsArray.map((post) => post.brand.id));
    const brandList = Array.from(brandSet).map((id) => {
      return postsArray.find((post) => post.brand.id === id).brand;
    });
    setBrands(brandList);
  };

  // Fetch and set posts when the component mounts or when currentUser changes
  useEffect(() => {
    getAndSetPosts();
  }, [currentUser]);

  // Filter and sort posts based on user selections and update filteredPosts state
  useEffect(() => {
    let posts = allPosts;

    // Filter by selected category if one is chosen
    if (selectedCategory) {
      posts = posts.filter(
        (post) => post.category.id === parseInt(selectedCategory)
      );
    }

    // Filter by selected brand if one is chosen
    if (selectedBrand) {
      posts = posts.filter((post) => post.brand.id === parseInt(selectedBrand));
    }

    // Filter by "for sale" status if toggled
    if (forSale) {
      posts = posts.filter((post) => post.forSale);
    }

    // Sort filtered posts by creation date (newest first)
    posts.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    // Update the filteredPosts state
    setFilteredPosts(posts);
  }, [selectedCategory, selectedBrand, forSale, allPosts]);

  // Uncomment this block if you want to shuffle posts each time the component renders
  // useEffect(() => {
  //   if (filteredPosts.length) {
  //     const shuffledPosts = [...filteredPosts].sort(() => Math.random() - 0.5);
  //     setFilteredPosts(shuffledPosts);
  //   }
  // }, [allPosts]);

  return (
    <div className="container all-posts-container my-4">
      <h1 className="text-center mb-4">All Posts</h1>
      <div className="row mb-4">
        <div className="col-md-12 col-lg-6 mb-3 mb-lg-0">
          {/* SearchBar component for searching posts */}
          <SearchBar posts={allPosts} setFilteredPosts={setFilteredPosts} />
        </div>
        <div className="col-md-12 col-lg-6">
          {/* PostFilterBar component for filtering posts by category, brand, and sale status */}
          <PostFilterBar
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            brands={brands}
            selectedBrand={selectedBrand}
            setSelectedBrand={setSelectedBrand}
            forSale={forSale}
            setForSale={setForSale}
          />
        </div>
      </div>
      <div className="row">
        {filteredPosts.length ? (
          filteredPosts.map((post) => (
            <div className="col-md-3 mb-4" key={post.id}>
              {/* Render SmallPost component for each post */}
              <SmallPost
                id={post.id}
                image={post.image || "/images/default.jpg"}
                year={post.year}
                brand={post.brand.name}
                model={post.model}
                user={post.user.name}
              />
            </div>
          ))
        ) : (
          <p>No posts available</p>
        )}
      </div>
    </div>
  );
};