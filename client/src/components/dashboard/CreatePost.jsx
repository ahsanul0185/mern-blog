import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { IoImageOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { RiDeleteBin7Line } from "react-icons/ri";
import { FaPencil } from "react-icons/fa6";
import MDEditor from "@uiw/react-md-editor";
import { useSelector } from "react-redux";
import axios from "axios";
import Loader from "../loaders/Loader";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import AIPostIdeas from "./AIPostIdeas";
import { useIsMobile } from "../../hooks/useIsMobile";

const CreatePost = () => {
  const { theme } = useSelector((state) => state.themeR);
  const [laoding, setLoading] = useState(false);
  const [postData, setPostData] = useState({
    title: "",
    category: "",
    content: "",
    coverImage: "",
    tags: [],
  });

  const imageFileRef = useRef();
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);

  const navigate = useNavigate();
  const [tagValue, setTagValue] = useState("");

  const formRef = useRef();
  const [formHeight, setFormHeight] = useState();
  const isMobile = useIsMobile(1024);

  // IMAGE FILE SELECT
  const handeImageFileInputChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 4 * 1024 * 1024) {
      toast.error("Too lerge image file", {
        style: {
          backgroundColor: "#a93800",
          color: "white",
          border: "1px solid rgba(255, 255, 255, 0.4)",
        },
      });
      return;
    }
    setImageFile(file);
    setImageFileUrl(URL.createObjectURL(file));
  };

  // UPLOADING IMAGE
  const uploadImageToCloudinary = async () => {
    if (!imageFile) return;

    const fileName = new Date().getTime() + imageFile.name;

    const imageFormData = new FormData();
    imageFormData.append("file", imageFile);
    imageFormData.append("upload_preset", "mern-blog");
    imageFormData.append("cloud_name", "dw8bzha3e");
    imageFormData.append("folder", "blog_cover_images");
    imageFormData.append("public_id", fileName);

    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dw8bzha3e/image/upload",
        imageFormData
      );

      setImageFileUrl(res.data.url);
      return res.data.url;
    } catch (error) {
      console.log(error);
    }
  };

  // TAG FIELD CHANGE
  const handeTagFieldChange = (e) => {
    if (
      e.key === "Enter" &&
      !postData.tags.includes(tagValue) &&
      postData.tags.length < 5
    ) {
      setPostData((prev) => ({
        ...prev,
        ["tags"]: [...postData.tags, tagValue],
      }));
      setTagValue("");
      e.preventDefault();
    }
    if (e.key === "Backspace" && !tagValue) {
      setPostData((prev) => ({
        ...prev,
        ["tags"]: postData.tags.slice(0, -1),
      }));
    }
  };

  // INPUT FIELD CHANGE
  const handleInputFieldChange = (e) => {
    const { id, value } = e.target;
    setPostData((prev) => ({ ...prev, [id]: value }));
  };

  // PUBLISH POST
  const handlePublishPost = async (e) => {
    const { title, category, content } = postData;

    if (!title.trim() || !category.trim() || !content.trim()) {
      toast.error(
        "Please fill out all required fields: Title, Category, and Content.",
        {
          style: {
            backgroundColor: "#a93800",
            color: "white",
            border: "1px solid rgba(255, 255, 255, 0.4)",
          },
        }
      );
      return;
    }

    try {
      setLoading(true);

      const imageUrl = await uploadImageToCloudinary();

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/post/create`,
        {
          ...postData,
          coverImage: imageUrl || postData.coverImage,
        }, {withCredentials : true}
      );
      if (res.status === 201) {
        toast.success("Post published successfully", {
          style: {
            backgroundColor: "#008b8c",
            color: "white",
            border: "1px solid rgba(255, 255, 255, 0.4)",
          },
        });
        setLoading(false);
        setPostData({
          title: "",
          category: "",
          content: "",
          coverImage: "",
          tags: [],
        });
        navigate(`/post/${res.data.slug}`);
      }
    } catch (error) {
      setLoading(false);
      toast(error.response.data.message);
      console.log(error);
    }
  };

  // CANCEL POST
  const handleCancel = async () => {
    navigate("/dashboard?tab=blog_posts");
    setPostData({
      title: "",
      category: "",
      content: "",
      coverImage: "",
      tags: [],
    });

    setImageFile(null);
    setImageFileUrl(null);
  };

  // Match the divs height
  useLayoutEffect(() => {
    if (!formRef.current || isMobile) return;

    setFormHeight(formRef.current.offsetHeight);

    const resizeObserver = new window.ResizeObserver((entries) => {
      for (let entry of entries) {
        setFormHeight(`${entry.contentRect.height - 24}px`);
      }
    });

    resizeObserver.observe(formRef.current);

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <div className="">
      <div className="flex gap-2 justify-between">
        <h1 className="font-bold text-3xl">Create a new post</h1>
        <div className="flex gap-3">
          <button
            onClick={handleCancel}
            className="button-primary bg-gray-400 dark:bg-gray-500 hover:bg-gray-600 overflow-hidden flex items-center justify-center gap-3"
          >
            Cancel
          </button>

          <button
            onClick={handlePublishPost}
            className="button-primary overflow-hidden flex items-center justify-center gap-3"
            disabled={laoding}
          >
            {laoding ? <Loader /> : <FaPaperPlane className="text-base" />}
            {laoding ? "Publishing" : "Publish"}
          </button>
        </div>
      </div>

      <div className="relative flex gap-6 mt-12 items-start flex-col lg:flex-row">
        <div ref={formRef} className="w-full order-2 lg:order-2">
          <form className="flex flex-col gap-6">
            <div className="flex gap-3">
              <div className="flex-1">
                <label htmlFor="title" className="form-label-primary">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  className="input-field-style"
                  value={postData.title}
                  onChange={handleInputFieldChange}
                  placeholder="How to create a fullstack website"
                />
              </div>
              <div>
                <label htmlFor="category" className="form-label-primary">
                  Category
                </label>
                <select
                  id="category"
                  className="input-field-style py-2 text-gray-300"
                  value={postData.category}
                  onChange={handleInputFieldChange}
                >
                  <option value="" disabled className="text-black/50">
                    Select Category
                  </option>
                  <option value="technology" className="text-black">
                    Technology
                  </option>
                  <option value="programming" className="text-black">
                    Programming{" "}
                  </option>
                  <option value="travel" className="text-black">
                    Travel
                  </option>
                  <option value="health" className="text-black">
                    Health
                  </option>
                </select>
              </div>
            </div>

            <div
              className="relative min-h-52"
              onClick={() => imageFileRef.current.click()}
            >
              <input
                type="file"
                className="input-field-style"
                ref={imageFileRef}
                onChange={handeImageFileInputChange}
                hidden
              />
              {(imageFile || postData.coverImage) && (
                <div className="absolute w-full h-full">
                  <img
                    src={imageFileUrl || postData.coverImage || ""}
                    alt=""
                    className="w-full h-full object-cover rounded"
                  />
                  <div className="absolute top-2 right-2 flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        imageFileRef.current.click();
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      className="size-7 grid place-items-center bg-primary/50 text-gray-200 hover:text-white dark:bg-dark/50 rounded dark:hover:bg-dark/60 cursor-pointer duration-200"
                    >
                      <FaPencil />
                    </button>
                    <button
                      onClick={(e) => {
                        setImageFile(null);
                        setImageFileUrl("");
                        e.stopPropagation();
                        e.preventDefault();
                      }}
                      className="size-7 grid place-items-center bg-primary/50 text-gray-200 hover:text-white dark:bg-dark/50 rounded dark:hover:bg-dark/60 cursor-pointer duration-200"
                    >
                      <RiDeleteBin7Line />
                    </button>
                  </div>
                </div>
              )}

              {!imageFile && (
                <div className="border-[2px] rounded min-h-52 border-gray-400 border-dotted flex flex-col gap-2 items-center justify-center cursor-pointer hover:bg-gray-300/50 dark:hover:bg-black/50 duration-300 ease-out">
                  <IoImageOutline className="text-gray-600 dark:text-gray-300 text-4xl" />
                  <p className="text-sm">Click to uplaod a cover image</p>
                </div>
              )}
            </div>

            <div>
              <label htmlFor="content" className="form-label-primary">
                Content
              </label>
              <div data-color-mode={theme} className="bg-red-500 min-h-60">
                <MDEditor
                  value={postData.content}
                  onChange={(e) =>
                    setPostData((prev) => ({ ...prev, ["content"]: e }))
                  }
                  textareaProps={{
                    placeholder: "Please enter Markdown text",
                  }}
                  height={600}
                  className=""
                />
              </div>
            </div>

            <div>
              <label htmlFor="tags" className="form-label-primary ">
                Tags
              </label>
              <div className="input-field-style p-1 flex gap-1.5 max-w-full overflow-x-auto">
                {postData.tags?.map((tag) => (
                  <button
                    key={tag}
                    className="button-primary text-xs shrink-0 flex gap-1 p-1 px-1.5 items-center"
                    onClick={(e) => e.preventDefault()}
                  >
                    {tag.toUpperCase()}
                    <RxCross2
                      onClick={() =>
                        setPostData((prev) => ({
                          ...prev,
                          ["tags"]: postData.tags?.filter(
                            (item) => item !== tag
                          ),
                        }))
                      }
                    />
                  </button>
                ))}
                {postData.tags?.length < 5 && (
                  <input
                    type="text"
                    id="tags"
                    className="outline-none flex-1 text-base"
                    value={tagValue}
                    onChange={(e) =>
                      setTagValue((prev) =>
                        prev.length < 16 ? e.target.value : prev
                      )
                    }
                    onKeyDown={handeTagFieldChange}
                    placeholder="Type and press Enter"
                  />
                )}
              </div>
            </div>
          </form>
        </div>

        <div
          style={{
            height: isMobile ? "40vh" : formHeight ? formHeight : "auto",
          }}
          className={`shrink-0 order-1 lg:order-2 overflow-auto mt-6 lg:max-w-sm w-full dark:bg-primaryDark border border-gray-300 dark:border-gray-200/40 rounded`}
        >
          <AIPostIdeas setPostData={setPostData} />
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
