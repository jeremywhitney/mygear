import { useEffect, useState } from "react";
import { getAllPosts } from "../services/postService";
import { getUserById } from "../services/userService";
import { LargePost } from "./LargePost";
import { PostFilterBar } from "../filter/PostFilterBar";
import { SearchBar } from "../inputs/SearchBar";
import { useParams } from "react-router-dom";

export const MyCollection = ({ currentUser }) => {
  const { userId } = useParams();
  const [allPosts, setAllPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [forSale, setForSale] = useState(false);
  const [viewedUser, setViewedUser] = useState(null);

  const getAndSetPosts = async () => {
    const postsArray = await getAllPosts();
    const userIdToUse = userId || currentUser.id;
    const userPosts = postsArray.filter(
      (post) => post.userId === parseInt(userIdToUse)
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

  const fetchViewedUser = async () => {
    if (userId) {
      const user = await getUserById(userId);
      setViewedUser(user);
    } else {
      setViewedUser(null);
    }
  };

  useEffect(() => {
    getAndSetPosts();
    fetchViewedUser();
  }, [currentUser, userId]);

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

  const isOwnCollection = !userId || userId === String(currentUser.id);

  return (
    <div className="container my-posts-container my-4">
      <h1 className="text-center mb-4">
        {isOwnCollection
          ? "My Collection"
          : `${viewedUser?.name || "User"}'s Collection`}
      </h1>
      <div className="row mb-4">
        <div className="col-md-12 col-lg-6 mb-3 mb-lg-0">
          <SearchBar posts={allPosts} setFilteredPosts={setFilteredPosts} />
        </div>
        <div className="col-md-12 col-lg-6">
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
            <LargePost
              key={post.id}
              id={post.id}
              user={post.user.name}
              brand={post.brand.name}
              condition={post.condition?.grade || ""}
              model={post.model}
              year={post.year}
              forSale={post.forSale}
              description={post.description}
              image={post.image || "/images/default.jpg"}
              date={post.timestamp}
              isOwnCollection={isOwnCollection}
            />
          ))
        ) : (
          <p>No posts available</p>
        )}
      </div>
    </div>
  );
};
