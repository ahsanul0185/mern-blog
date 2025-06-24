import axios from "axios"
import { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../Loader";
import moment from "moment";
import { FiEdit } from "react-icons/fi";
import { MdOutlineDelete } from "react-icons/md";
import { IoAlertCircleOutline } from "react-icons/io5";
import Modal from "../Modal";
import { toast } from "sonner";
import LoaderBlogList from "../loaders/LoaderBlogList";

const DashPosts = () => {

  const {currentUser} = useSelector(state => state.userR);
  const [posts, setPosts] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showMore, setShowMore] = useState(false);

  const [triggerReloadAfterPostDelete, setTriggerReloadAfterPostDelete] = useState(false);



  useEffect(() => {
    const getPosts = async () => {
      try {
        setLoading(true)
        const res = await axios.get(`/api/post/get_posts?userId=${currentUser._id}`);
        if (res.status === 200) {
          setPosts(res.data.posts);
        }
        setLoading(false);

        if (res.data.posts.length < 9) {
          setShowMore(false);
        }else{
          setShowMore(true);
        }
      } catch (error) {
        setLoading(false);
        setError(error.response.data.messasge)
      }
    }
    if (currentUser.role === "admin") getPosts();
  }, [triggerReloadAfterPostDelete])

  const handleShowMorePosts = async () => {
    const startIndex = posts.length;

    try {
      const res = await axios.get(`/api/post/get_posts?userId=${currentUser._id}&startIndex=${startIndex}`);
      if (res.status === 200) {
        setPosts(prev => [...prev, ...res.data.posts]);
      }
      if (res.data.posts.length < 9) {
        setShowMore(false);
      }
    } catch (error) {
      setError(error.response.data.messasge)
    }
  }
  

  return (
    <div className="h-full flex flex-col">
      <div className="flex gap-2 justify-between">
        <h1 className="font-bold text-3xl">Blog posts</h1>
        <Link
          to="/dashboard/create-post"
          className="button-primary flex items-center justify-center gap-1"
        >
          <FiPlus className="text-[18px]" />
          Create Post
        </Link>
      </div>

    {/* Posts List*/}
    <div className="mt-16 grow">
      {loading ? (
        <div className="h-full grid place-items-center">
          <LoaderBlogList/>
        </div>
      ) : <div className="flex flex-col gap-5 rounded overflow-x-auto flex-nowrap custom-scrollbar">
          {posts.length !==0 ? (
          posts.map(post => <Post key={post._id} post={post} setPosts={setPosts} />)
        ) : (
          !loading && <h2 className="text-2xl font-bold">No posts found : ( </h2>
        )}
        </div>}
        {showMore && <button onClick={handleShowMorePosts} className="button-primary mt-6 w-full">Show More</button>}
    </div>

    </div>
  );
};

export default DashPosts;



const Post = ({post, setPosts}) => {

  const navigate = useNavigate();
  const {currentUser} = useSelector(state => state.userR);
  const {title, coverImage, updatedAt, tags, slug, category} = post;
  const formattedDate = moment(updatedAt).format("Do MMMM YYYY");
    const [activeModal, setActiveModal] = useState(null);

    const handleDeletePost = async (postId) => {
      try {
        const res = await axios.delete(`/api/post/delete/${postId}/${currentUser._id}`)
        if (res.status === 200) {
          toast(res.data.message, {style : {backgroundColor : "#a93800", color : "white", border : "1px solid rgba(255, 255, 255, 0.4)"}})
          setActiveModal(null);
          setPosts(prev => prev.filter(post => post._id !== postId));
        }
      } catch (error) {
        console.log(error);
        toast("Failed to delete the post", {style : {backgroundColor : "#a93800", color : "white", border : "1px solid rgba(255, 255, 255, 0.4)"}});
        setActiveModal(null);
      }
    }

  return (
    <div className="relative min-w-[580px] flex gap-4 bg-white/10 items-center p-2.5 rounded group border border-gray-300 dark:border-gray-200/20">
      <img onClick={() => navigate(`/post/${slug}`)} src={coverImage || null} className="w-16 md:w-26 aspect-square rounded cursor-pointer object-cover"  alt="blog image" />
      <div className="grow flex flex-col items-start gap-1">
        
          <h2 onClick={() => navigate(`/post/${slug}`)} className="font-semibold cursor-pointer text-sm md:text-base">{title}</h2>

        <div className="flex text-[10px] md:text-xs gap-3">
          <span className="text-[10px] md:text-xs bg-gray-300/50 dark:bg-white/10 px-1.5 py-0.5 rounded block">Updated : {formattedDate}</span>
          <span className="w-[1px] bg-gray-300 dark:bg-white/10"></span>
            <span className="px-1.5 py-0.5 text-[10px] md:text-xs text-gray-600 dark:text-gray-300 font-semibold">{category.charAt(0).toUpperCase() + category.slice(1)}</span>
        </div>
          {tags.length > 1 && <div className="flex items-center gap-1 text-[10px] md:text-xs mt-1 md:mt-3">Tags : {tags.map(tag => <span key={tag} className="bg-primary/20 text-primaryDark font-semibold dark:text-white rounded px-1.5 py-0.5">{tag.charAt(0).toUpperCase() + tag.slice(1)}</span>)}</div>}
      </div>

      <div className="absolute top-2.5 right-2.5 opacity-0 invisible group-hover:opacity-100 group-hover:visible duration-200  md:text-xl flex gap-2">
        <button onClick={() => navigate(`/dashboard/update-post/${post._id}`, {state : post})} to={``} className="text-gray-600 dark:text-gray-300 duration-200 hover:text-primary"><FiEdit /></button>
        <button onClick={() => setActiveModal("delete-post")}><MdOutlineDelete className="text-[18px] md:text-[22px] text-red-400 hover:text-red-600 duration-200" /></button>
      </div>

      <Modal
            showModal={activeModal === "delete-post"}
            setShowModal={setActiveModal}
          >
            <IoAlertCircleOutline className="text-7xl mx-auto text-gray-300" />
            <h2 className="font-bold text-2xl mt-2 text-center">
              Are you sure you want to delete this post?
            </h2>
            
            <div className="mt-8 flex justify-between">
              <button
                onClick={() => handleDeletePost(post._id)}
                className="button-primary bg-red-600 hover:bg-red-700"
              >
                Yes, I'm sure
              </button>
              <button
                className="button-primary bg-gray-400 dark:bg-gray-400/30 dark:hover:bg-gray-400/50"
                onClick={() => setActiveModal(null)}
              >
                Cancel
              </button>
            </div>
          </Modal>
    </div>
  )
}
