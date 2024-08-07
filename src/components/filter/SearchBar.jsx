import { useEffect, useState } from "react";

export const SearchBar = ({ posts, setFilteredPosts }) => {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const filterPosts = () => {
      const lowerCaseQuery = query.toLowerCase();

      const filtered = posts.filter((post) => {
        return (
          post.category.name.toLowerCase().includes(lowerCaseQuery) ||
          post.brand.name.toLowerCase().includes(lowerCaseQuery) ||
          post.model.toLowerCase().includes(lowerCaseQuery) ||
          post.year.toString().includes(lowerCaseQuery) ||
          post.user.name.toLowerCase().includes(lowerCaseQuery) ||
          post.description.toLowerCase().includes(lowerCaseQuery)
        );
      });

      setFilteredPosts(filtered);
    };
    filterPosts();
  }, [query, posts, setFilteredPosts]);

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

