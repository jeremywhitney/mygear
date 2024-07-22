import { useEffect, useState } from "react";
import { getAllPostsWithUserAndBrand } from "../services/postService";
import { SmallPost } from "./SmallPost";
import "./Posts.css";

export const AllPosts = ({ currentUser }) => {
  const [allPosts, setAllPosts] = useState([]);

  const getAndSetPosts = () => {
    getAllPostsWithUserAndBrand().then((postsArray) => {
      setAllPosts(postsArray);
    });
  };

  useEffect(() => {
    getAndSetPosts();
  }, [currentUser]);

  return (
    <div className="all-posts-container">
      <h2>All Posts</h2>
      <article className="all-posts">
        {allPosts.map((post) => (
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
