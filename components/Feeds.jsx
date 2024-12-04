"use client";

import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post.id}
          post={post}
          handleTagClick={() => handleTagClick(post.tags)}
        />
      ))}
    </div>
  );
};

const Feeds = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  const handleSearchChange = (e) => {
    const searchPosts = e.target.value.toLowerCase();
    setSearchText(searchPosts);

    if (!searchPosts) {
      setFilteredPosts(posts);
    }

    const filtered = posts.filter(
      (post) =>
        post.prompt?.toLowerCase().includes(searchPosts) ||
        post.tags === searchPosts ||
        post.username.toLowerCase().includes(searchPosts),
    );

    setFilteredPosts(filtered);
  };

  const handleTagClick = (tags) => {
    const filtered = posts.filter((post) => post.tags === tags);
    setFilteredPosts(filtered);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();

      setPosts(data);
      setFilteredPosts(data);
    };

    fetchData();
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="search for prompts, tags or username"
          value={searchText}
          onChange={handleSearchChange}
          className="search_input peer"
        />
      </form>

      <PromptCardList data={filteredPosts} handleTagClick={handleTagClick} />
    </section>
  );
};

export default Feeds;
