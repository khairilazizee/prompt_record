import React from "react";

import PromptCard from "./PromptCard";

const Profile = ({ name, description, handleEdit, handleDelete, posts }) => {
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="gradient_blue">{name}</span>
      </h1>
      <p className="mt-6 text-left">{description}</p>

      <div className="mt-16 prompt_layout">
        {posts.map((post) => (
          <PromptCard
            key={post.id}
            post={post}
            handleEdit={() => handleEdit && handleEdit(post)}
            handleDelete={() => handleDelete && handleDelete(post)}
          />
        ))}
      </div>
    </section>
  );
};

export default Profile;
