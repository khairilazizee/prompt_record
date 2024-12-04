"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Forms from "@/components/Forms";
const EditPrompt = () => {
  const router = useRouter;
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");
  const [submitting, setSubmitting] = useState(false);
  const [posts, setPosts] = useState({
    prompt: "",
    tags: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/prompt/${promptId}`);
      const data = await response.json();
      setPosts({
        prompt: data.prompt,
        tags: data.tags,
      });
    };

    if (promptId) fetchData();
  }, [promptId]);

  const updatePrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    if (!promptId) return alert("Prompt ID is required");

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: posts.prompt,
          tags: posts.tags,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="w-full">
      <Forms
        type="Update"
        posts={posts}
        setPosts={setPosts}
        submitting={submitting}
        handleSubmit={updatePrompt}
      />
    </section>
  );
};

export default EditPrompt;
