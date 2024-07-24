import { useEffect, useState } from "react";
import { getAllPosts } from "../services/postService";
import { LargePost } from "./LargePost";
import { PostFilterBar } from "../filter/PostFilterBar";
import { SearchBar } from "../filter/SearchBar";
import "./Posts.css";
import "../filter/Filters.css";

export const MyCollection = ({ currentUser }) => {
  const [allPosts, setAllPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [forSale, setForSale] = useState(false);

  const getAndSetPosts = async () => {
    const postsArray = await getAllPosts();
    const userPosts = postsArray.filter(
      (post) => post.userId === currentUser.id
    );
    setAllPosts(userPosts);
    setFilteredPosts(userPosts);

    const categorySet = new Set(userPosts.map((post) => post.category.id));
    const categoryList = Array.from(categorySet).map((id) => {
      return userPosts.find((post) => post.category.id === id).category;
    });
    setCategories(categoryList);

    const brandSet = new Set(userPosts.map((post) => post.brand.id));
    const brandList = Array.from(brandSet).map((id) => {
      return userPosts.find((post) => post.brand.id === id).brand;
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

  // Check if currentUser's collection
  const isOwnCollection = true

  return (
    <div className="my-posts-container">
      <h1>My Collection</h1>
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
      <article className="my-posts">
        {filteredPosts.map((post) => (
          <LargePost
            key={post.id}
            user={post.user.name}
            brand={post.brand.name}
            condition={post.condition?.grade || ""}
            model={post.model}
            year={post.year}
            forSale={post.forSale}
            description={post.description}
            image={post.image}
            date={post.timestamp}
            isOwnCollection={isOwnCollection}
          />
        ))}
      </article>
    </div>
  );
};
