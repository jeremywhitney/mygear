import { useEffect, useState } from "react";
import { getAllPosts } from "../services/postService";
import { SmallPost } from "./SmallPost";
import { PostFilterBar } from "../filter/PostFilterBar";
import { SearchBar } from "../filter/SearchBar";
import "./Posts.css";
import "../filter/Filters.css";

export const AllPosts = ({ currentUser }) => {
  const [allPosts, setAllPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [showForSale, setShowForSale] = useState(false);

  const getAndSetPosts = async () => {
    const postsArray = await getAllPosts();
    setAllPosts(postsArray);
    setFilteredPosts(postsArray);
    const categoryList = Array.from(
      new Set(postsArray.map((post) => post.category.name))
    ).sort(); // Alphabetize Category list
    setCategories(categoryList);
    const brandList = Array.from(
      new Set(postsArray.map((post) => post.brand.name))
    ).sort(); // Alphabetize Brand list
    setBrands(brandList);
  };

  useEffect(() => {
    getAndSetPosts();
  }, [currentUser]);

  useEffect(() => {
    let posts = allPosts;

    if (selectedCategory) {
      posts = posts.filter((post) => post.category.name === selectedCategory);
    }

    if (selectedBrand) {
      posts = posts.filter((post) => post.brand.name === selectedBrand);
    }

    if (showForSale) {
      posts = posts.filter((post) => post.forSale);
    }

    setFilteredPosts(posts);
  }, [selectedCategory, selectedBrand, showForSale, allPosts]);

  return (
    <div className="all-posts-container">
      <SearchBar posts={allPosts} setFilteredPosts={setFilteredPosts} />
      <PostFilterBar
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        brands={brands}
        selectedBrand={selectedBrand}
        setSelectedBrand={setSelectedBrand}
        showForSale={showForSale}
        setShowForSale={setShowForSale}
      />
      <article className="all-posts">
        {filteredPosts.map((post) => (
          <SmallPost
            key={post.id}
            image={post.image}
            year={post.year}
            brand={post.brand.name}
            model={post.model}
            user={post.user.name}
          />
        ))}
      </article>
    </div>
  );
};
