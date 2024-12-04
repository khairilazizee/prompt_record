"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@/components/Profile";

const MyProfile = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await res.json();
      setPosts(data);
    };
    if (session?.user.id) fetchData();
  }, [session?.user.id]);

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  const handleDelete = async (post) => {
    const hasConfirm = confirm("Delete this prompt?");

    if (hasConfirm) {
      try {
        const response = await fetch(`/api/prompt/${post._id}`, {
          method: "DELETE",
        });

        const filteredPosts = posts.filter((p) => p._id !== post._id);
        setPosts(filteredPosts);

        if (response.ok) {
          router.push("/profile");
        }
      } catch (error) {
        console.error(error);
      }
    }
  };
  return (
    <Profile
      name="My Profile"
      description="Welcome to your personal profile page"
      handleEdit={handleEdit}
      handleDelete={handleDelete}
      posts={posts}
    />
  );
};

export default MyProfile;
