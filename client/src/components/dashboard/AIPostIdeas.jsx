import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoReload, IoSparkles } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { generatePostIdeas } from "../../features/posts/postSlice";
import Modal from "../Modal";
import { toast } from "sonner";
import Loader from "../loaders/Loader";
import SkeltonLoader from "../loaders/SkeltonLoader";

const AIPostIdeas = ({ setPostData }) => {
  const { currentUser } = useSelector((state) => state.userR);
  const dispatch = useDispatch();

  const { postIdeas } = useSelector((state) => state.postR);

  const [activeModal, setActiveModal] = useState(null);
  const [selectedPostIdea, setSelectedPostIdea] = useState(null);
  const [generatePostData, setGeneratePostData] = useState({});

  const [loadingGenerate, setLoadingGenerate] = useState(false);

  useEffect(() => {
    if (currentUser.role === "admin" && !postIdeas) {
      dispatch(generatePostIdeas());
    }
  }, [currentUser]);

  const handleIdeaClick = (idea) => {
    setActiveModal(true);
    setSelectedPostIdea(idea);
    setGeneratePostData((prev) => ({
      ...prev,
      title: idea.title,
      tone: idea.tone,
    }));
  };

  const handleInputChange = (e) => {
    setGeneratePostData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleGeneratePost = async (e) => {
    e.preventDefault();

    if (!generatePostData.title.trim() || !generatePostData.tone.trim()) {
      return toast.error("Title and tone are required", {
        style: {
          backgroundColor: "#a93800",
          color: "white",
          border: "1px solid rgba(255, 255, 255, 0.4)",
        },
      });
    }

    try {
      setLoadingGenerate(true);
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/ai/generate_blog_post`,
        {
          title: generatePostData.title.trim(),
          tone: generatePostData.tone.trim(),
        }, {withCredentials : true}
      );

      const aiGeneratedPostData = {
        title: generatePostData.title,
        category: selectedPostIdea?.category || "",
        content: res.data,
        coverImage:
          "https://img.freepik.com/premium-photo/purple-pink-colored-liquid-with-purple-background_605423-227906.jpg",
        tags: selectedPostIdea?.tags || [],
      };

      if (res.status === 200) {
        setPostData(aiGeneratedPostData);
      }

      console.log(aiGeneratedPostData);
    } catch (error) {
      console.log(error);
      toast.error("Failed to generate post");
    } finally {
      setLoadingGenerate(false);
      setActiveModal(null);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center flex-col sm:flex-row justify-between gap-2 p-5 shrink-0">
        <h2 className="font-semibold flex items-center gap-2 text-primary dark:text-white">
          {" "}
          <IoSparkles /> Ideas for your next post
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => {
              setGeneratePostData({ tone: "", title: "" });
              setActiveModal(true);
            }}
            className="text-xs button-primary"
          >
            Generate New
          </button>

          <button
            onClick={() => postIdeas && dispatch(generatePostIdeas())}
            className=" cursor-pointer hover:text-white"
          >
            <IoReload />
          </button>
        </div>
      </div>

      <div className="flex flex-col flex-1 overflow-auto custom-scrollbar">
        {!postIdeas ? (
          <div className="px-5 pb-5">
            <SkeltonLoader />
            <SkeltonLoader />
          </div>
        ) : (
          postIdeas?.map((idea, idx) => (
            <PostIdeaCard key={idx} idea={idea} onIdeaClick={handleIdeaClick} />
          ))
        )}
      </div>

      <Modal
        showModal={activeModal}
        setShowModal={!loadingGenerate && setActiveModal}
      >
        <h2 className="text-xl font-semibold flex items-center gap-2">
          {" "}
          <IoSparkles /> Generate a Blog Post
        </h2>

        <p className="text-sm mt-1 mb-5">
          Provide a title and tone to generate your blog post
        </p>

        <form onSubmit={handleGeneratePost} className="flex flex-col gap-4">
          <div className="">
            <label htmlFor="title" className="form-label-primary">
              Blog Post Title
            </label>

            <textarea
              className="input-field-style outline-none resize-none overflow-hidden"
              onChange={handleInputChange}
              name="title"
              maxLength={400}
              placeholder="What's on your mind..."
              value={generatePostData.title}
              ref={(e) =>
                e && (e.selectionStart = e.selectionEnd = e.value.length)
              }
              onInput={(e) => {
                e.target.style.height = "auto";
                e.target.style.maxHeight = "200px";
                e.target.style.height = `${e.target.scrollHeight}px`;
              }}
            ></textarea>
          </div>
          <div className="">
            <label htmlFor="title" className="form-label-primary">
              Tone
            </label>
            <input
              type="text"
              name="tone"
              className="input-field-style"
              value={generatePostData.tone}
              onChange={handleInputChange}
              placeholder="e.g., technical, casual, beginner-friendly, etc."
            />
          </div>

          <button
            type="submit"
            disabled={loadingGenerate}
            className="button-primary w-full mt-2 flex items-center justify-center gap-2"
          >
            {" "}
            {loadingGenerate && <Loader />}{" "}
            {loadingGenerate ? "Generating" : "Generate post"}
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default AIPostIdeas;

const PostIdeaCard = ({ idea, onIdeaClick }) => {
  const { title, description, tags, tone } = idea;

  return (
    <div
      onClick={() => onIdeaClick(idea)}
      className="p-5 border-b border-b-gray-300 dark:border-b-gray-200/40 cursor-pointer duration-300 ease-in-out  hover:bg-gray-100 dark:hover:bg-primary/20"
    >
      <h2 className="font-semibold mb-1">{title}</h2>
      <span className="text-xs bg-amber-400/40 dark:bg-amber-400/50 px-2 py-0.5 rounded">
        {tone}
      </span>
      <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
        {description}
      </p>
      <div className="text-xs flex items-center gap-2 mt-1.5">
        {tags.map((tag) => (
          <span key={tag} className="bg-primary/40 px-1.5 py-[1px] rounded">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};
