import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { BiSolidCommentDots } from "react-icons/bi";
import { FaArrowUp, FaUsers } from "react-icons/fa";
import { HiRectangleStack } from "react-icons/hi2";
import { IoArrowUp } from "react-icons/io5";
import { useSelector } from "react-redux";
import CategoryChart from "./CategoryChart";
import RecentPosts from "../post/RecentPosts";
import { Link, useNavigate } from "react-router-dom";
import Comment from "../post/Comment";
import DashInsightsSkeleton from "../loaders/DashInsightsSkeleton";

const DashInsights = () => {
  const { currentUser } = useSelector((state) => state.userR);
  const navigate = useNavigate();
  const [insights, setInsights] = useState([
    {
      title: "Total Users",
      total: "",
      lastMonth: "",
      icon: <FaUsers className="text-2xl" />,
      color: "",
    },
    {
      title: "Total Posts",
      total: "",
      lastMonth: "",
      icon: <HiRectangleStack className="text-2xl" />,
      color: "",
    },
    {
      title: "Total Comments",
      total: "",
      lastMonth: "",
      icon: <BiSolidCommentDots className="text-2xl" />,
      color: "",
    },
  ]);
  const [categoryPosts, setCategoryPosts] = useState([]);
  const [recentPosts, setRecentPosts] = useState([]);
  const [comments, setRecentComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUsersData = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/user/get_users`, {withCredentials : true}
        );
        if (res.status === 200) {
          setInsights((prev) =>
            prev.map((insight, idx) =>
              idx === 0
                ? {
                    ...insight,
                    total: res.data.totalUsers,
                    lastMonth: res.data.lastMonthUsers,
                  }
                : insight
            )
          );
        }
      } catch (error) {
        console.log(error);
      }
    };

    const getPostsData = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/post/get_posts` , {withCredentials : true}
        );
        if (res.status === 200) {
          setInsights((prev) =>
            prev.map((insight, idx) =>
              idx === 1
                ? {
                    ...insight,
                    total: res.data.totalPosts,
                    lastMonth: res.data.lastMonthPosts,
                  }
                : insight
            )
          );
        }
      } catch (error) {
        console.log(error);
      }
    };

    const getCommentsData = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/comment/get_all_comments?sort=desc`, {withCredentials : true}
        );
        if (res.status === 200) {
          setInsights((prev) =>
            prev.map((insight, idx) =>
              idx === 2
                ? {
                    ...insight,
                    total: res.data.totalComments,
                    lastMonth: res.data.lastMonthComments,
                  }
                : insight
            )
          );
        }
      } catch (error) {
        console.log(error);
      }
    };

    const getCategory = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/post/get_post_state_by_category`, {withCredentials : true}
        );
        if (res.status === 200) {
          setCategoryPosts(
            Object.values(
              res.data.reduce((acc, item) => {
                const category =
                  item.category.charAt(0).toUpperCase() +
                  item.category.slice(1).toLowerCase();
                if (!acc[category]) {
                  acc[category] = { ...item, category };
                } else {
                  // If duplicate, sum the counts (if you have a count property)
                  acc[category].count += item.count;
                }
                return acc;
              }, {})
            )
          );
        }
      } catch (error) {
        console.log(error);
      }
    };

    const getRecentPosts = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/post/get_posts?limit=5`, {withCredentials : true}
        );
        if (res.status === 200) {
          setRecentPosts(res.data.posts);
        }
      } catch (error) {
        console.log(error);
      }
    };

    const getAllComments = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/comment/get_all_comments?sort=desc&limit=5`, {withCredentials : true}
        );
        if (res.status === 200) {
          setRecentComments(res.data.comments);
        }
      } catch (error) {
        console.log(error);
      }
    };

    const fetchAll = async () => {
      setLoading(true);
      await Promise.all([
        getUsersData(),
        getPostsData(),
        getCommentsData(),
        getCategory(),
        getRecentPosts(),
        getAllComments(),
      ]);
      setLoading(false);
    };

    if (currentUser.role === "admin") {
      fetchAll();
    }
  }, []);

  if (loading) return <DashInsightsSkeleton />;

  return (
    <div>
      <div>
        <h2 className="text-3xl font-semibold">
          Hello {currentUser.username} !
        </h2>
        <p className="mt-1 text-gray-600 dark:text-gray-300">
          {moment().format("Do MMMM YYYY")}
        </p>
      </div>

      {/* Top insights */}
      <div className="mt-10 flex flex-col lg:flex-row items-center gap-6">
        {insights?.map((insight) => (
          <div
            key={insight.title}
            className="p-4 bg-gray-200 dark:bg-primaryDark rounded w-full  dark:border border-gray-300 dark:border-gray-200/40"
          >
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-sm uppercase text-gray-600 dark:text-gray-300">
                  {insight.title}
                </h2>
                <p className="text-3xl font-semibold">{insight.total}</p>
              </div>
              {insight.icon}
            </div>
            <div className="mt-3 flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
              <span className="text-green-600 dark:text-green-300 flex items-center gap-1">
                <IoArrowUp />
                {insight.lastMonth}
              </span>
              Last month
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-col lg:flex-row gap-6">
        {/* Donut Chart */}
        <div className="lg:w-[60%] shrink-0 bg-gray-200 dark:bg-primaryDark dark:border border-gray-300 dark:border-gray-200/40 p-4 rounded">
          <CategoryChart chartData={categoryPosts} />
        </div>

        {/* Recent Posts */}
        <div className="grow bg-gray-200  dark:bg-primaryDark  dark:border border-gray-300 dark:border-gray-200/40 p-4 rounded">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-[19px]">Recent Posts</h2>
            <Link
              to="/dashboard?tab=blog_posts"
              className="text-sm cursor-pointer hover:text-primary duration-200"
            >
              See All
            </Link>
          </div>

          <div className="flex flex-col gap-4 mt-6">
            {recentPosts.map((post) => (
              <div
                key={post._id}
                className="flex items-center gap-3 cursor-pointer"
                onClick={() => navigate(`/post/${post.slug}`)}
              >
                <img
                  src={post.coverImage}
                  alt="post image"
                  className="w-18 aspect-[3/2] object-cover rounded"
                />
                <div>
                  <h3 className="text-[13.5px] line-clamp-2">{post.title}</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-300">
                    {moment(post.createdAt).fromNow()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Comments */}
      <div className="mt-6 bg-gray-200  dark:bg-primaryDark  dark:border border-gray-300 dark:border-gray-200/40 p-4 rounded">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-[19px]">Recent Comments</h2>
          <Link
            to="/dashboard?tab=comments"
            className="text-sm cursor-pointer hover:text-primary duration-200"
          >
            See All
          </Link>
        </div>

        <div className="mt-6 flex flex-col gap-6">
          {comments.map((comment) => (
            <div key={comment._id}>
              <Comment comment={comment} type="dash" />
              <Link
                to={`/post/${comment.postId}`}
                className="text-xs px-1 py-0.5 rounded cursor-pointer hover:bg-primary/30 duration-200 ml-13 bg-primary/50"
              >
                See Post
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashInsights;
