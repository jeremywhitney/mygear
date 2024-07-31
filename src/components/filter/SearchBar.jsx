import { useEffect, useState } from "react";

export const SearchBar = ({ posts, setFilteredPosts }) => {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const filterPosts = () => {
      const lowerCaseQuery = query.toLocaleLowerCase();

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
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
};
