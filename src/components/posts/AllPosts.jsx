import { useEffect, useState } from "react";
import { getAllPosts } from "../services/postService";
import { SmallPost } from "./SmallPost";
import { PostFilterBar } from "../filter/PostFilterBar";
import { SearchBar } from "../filter/SearchBar";
import "./Posts.css";
import "../filter/Filters.css";
import { Link } from "react-router-dom";

export const AllPosts = ({ currentUser }) => {
  const [allPosts, setAllPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [forSale, setForSale] = useState(false);

  const getAndSetPosts = async () => {
    const postsArray = await getAllPosts();
    setAllPosts(postsArray);
    setFilteredPosts(postsArray);

    const categorySet = new Set(postsArray.map((post) => post.category.id));
    const categoryList = Array.from(categorySet).map((id) => {
      return postsArray.find((post) => post.category.id === id).category;
    });
    setCategories(categoryList);

    const brandSet = new Set(postsArray.map((post) => post.brand.id));
    const brandList = Array.from(brandSet).map((id) => {
      return postsArray.find((post) => post.brand.id === id).brand;
    });
    setBrands(brandList);
  };

  useEffect(() => {
    getAndSetPosts();
  }, [currentUser]);

  useEffect(() => {
    let posts = allPosts;

    if (selectedCategory) {
      posts = posts.filter(
        (post) => post.category.id === parseInt(selectedCategory)
      );
    }

    if (selectedBrand) {
      posts = posts.filter((post) => post.brand.id === parseInt(selectedBrand));
    }

    if (forSale) {
      posts = posts.filter((post) => post.forSale);
    }

    setFilteredPosts(posts);
  }, [selectedCategory, selectedBrand, forSale, allPosts]);

  return (
    <div className="all-posts-container">
      <h1>All Posts</h1>
      <SearchBar posts={allPosts} setFilteredPosts={setFilteredPosts} />
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
      <article className="all-posts">
        {filteredPosts.map((post) => (
          <SmallPost
            key={post.id}
            id={post.id}
            image={post.image || "/images/default.jpg"}
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
