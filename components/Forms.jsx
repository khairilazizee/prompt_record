import Link from "next/link";

const Forms = ({ type, posts, setPosts, submitting, handleSubmit }) => {
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type} prompt</span>
      </h1>
      <p className="desc text-left max-w-md">
        {type} and share amazing prompts with the community.
      </p>

      <form
        onSubmit={handleSubmit}
        className="glassmorphism mt-10 w-full flex-col flex gap-7 mb-20"
      >
        <div className="flex flex-col gap-2">
          <label
            htmlFor="prompt"
            className="font-satoshi font-semibold text-base text-gray-700"
          >
            Your AI Prompt
          </label>
          <textarea
            value={posts.prompt}
            onChange={(e) => setPosts({ ...posts, prompt: e.target.value })}
            id="prompt"
            name="prompt"
            placeholder="Write your prompt here"
            className="form_textarea"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="tags"
            className="font-satoshi font-semibold text-base text-gray-700"
          >
            Tags
          </label>
          <input
            value={posts.tags}
            onChange={(e) => setPosts({ ...posts, tags: e.target.value })}
            id="tags"
            name="tags"
            placeholder="Enter tags here : e.g: #placeholder, #productname, #idea"
            className="form_input"
            required
          />
        </div>
        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/" className="text-gray-500 text-sm">
            Cancel
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-1.5 text-sm bg-primary-orange rounded-lg text-white"
          >
            {submitting ? `${type} prompt...` : `${type}`}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Forms;
