import { useRef, useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { IoImageOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { RiDeleteBin7Line } from "react-icons/ri";
import { FaPencil } from "react-icons/fa6";
import MDEditor from "@uiw/react-md-editor";
import { useSelector } from "react-redux";

const CreatePost = () => {
  const {theme} = useSelector(state => state.themeR);
  const [postData, setPostData] = useState("");

  const imageFileRef = useRef();
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);

  const [tags, setTags] = useState([]);
  const [tagValue, setTagValue] = useState("");

  const handeImageFileInputChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 4 * 1024 * 1024) {
      alert("too lerge file");
      return;
    }
    setImageFile(file);
    setImageFileUrl(URL.createObjectURL(file));
  };

  const handeTagFieldChange = (e) => {
    if (e.key === "Enter" && !tags.includes(tagValue) && tags.length < 5) {
      setTags((prev) => [...prev, tagValue]);
      setTagValue("");
      e.preventDefault();
      console.log(tags);
    }
    if (e.key === "Backspace" && !tagValue) {
      setTags((prev) => prev.slice(0, -1));
    }
  };

  return (
    <div className="max-w-6xl mx-auto h-[200vh]">
      <div className="flex gap-2 justify-between">
        <h1 className="font-bold text-3xl">Create a new post</h1>
        <button className="button-primary flex items-center justify-center gap-3">
          <FaPaperPlane className="text-base" />
          Publish
        </button>
      </div>
      <div className="mt-12">
        <form className="flex flex-col gap-6">
          <div>
            <label htmlFor="title" className="form-label-primary">
              Title
            </label>
            <input
              type="text"
              id="title"
              className="input-field-style"
              placeholder="How to create a fullstack website"
            />
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
            {imageFile && (
              <div className="absolute w-full h-full">
                <img
                  src={imageFileUrl || ""}
                  alt=""
                  className="w-full h-full object-cover rounded"
                />
                <div className="absolute top-2 right-2 flex items-center gap-2">
                  <button
                    onClick={(e) => {imageFileRef.current.click();e.preventDefault}}
                    className="size-7 grid place-items-center bg-primary/50 text-gray-200 hover:text-white dark:bg-dark/50 rounded dark:hover:bg-dark/60 cursor-pointer duration-200"
                  >
                    <FaPencil />
                  </button>
                  <button
                    onClick={(e) => {
                      setImageFile(null);
                      setImageFileUrl("");
                      e.stopPropagation();
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
                value={postData}
                onChange={(e) => setPostData(e)}
                textareaProps={{
                  placeholder: "Please enter Markdown text"
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
              {tags.map((tag) => (
                <button
                  key={tag}
                  className="button-primary text-xs shrink-0 flex gap-1 p-1 px-1.5 items-center"
                  onClick={(e) => e.preventDefault()}
                >
                  {tag.toUpperCase()}
                  <RxCross2
                    onClick={() =>
                      setTags((prev) => prev.filter((item) => item !== tag))
                    }
                  />
                </button>
              ))}
              {tags.length < 5 && (
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
    </div>
  );
};

export default CreatePost;
