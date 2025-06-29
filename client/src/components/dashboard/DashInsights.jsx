import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { BiSolidCommentDots } from "react-icons/bi";
import { FaArrowUp, FaUsers } from "react-icons/fa";
import { HiRectangleStack } from "react-icons/hi2";
import { IoArrowUp } from "react-icons/io5";
import { useSelector } from "react-redux";
import CategoryChart from "./CategoryChart";

const DashInsights = () => {
  const { currentUser } = useSelector((state) => state.userR);
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

  useEffect(() => {
    const getUsersData = async () => {
      try {
        const res = await axios.get("/api/user/get_users");
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
        const res = await axios.get("/api/post/get_posts");
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
        const res = await axios.get("/api/comment/get_all_comments");
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
            const res = await axios.get("/api/post/get_post_state_by_category");
            if (res.status === 200) {
                setCategoryPosts(res.data.map(item => ({...item, category : item.category.charAt(0).toUpperCase() + item.category.slice(1)})));
            }
        } catch (error) {
            console.log(error)
        }
    } 

    if (currentUser.role === "admin") {
      getUsersData();  
      getPostsData();
      getCommentsData();
      getCategory();
    }
  }, []);

  useEffect(() => {
    console.log(insights);
  }, [insights]);

  return (
    <div>
      <div>
        <h2 className="text-3xl font-semibold">Hello {currentUser.username} !</h2>
        <p className="mt-1 text-gray-600 dark:text-gray-300">
          {moment().format("Do MMMM YYYY")}
        </p>
      </div>

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


      <div className="mt-6 flex gap-6">
        <div className="w-[60%] bg-gray-200 dark:bg-primaryDark dark:border border-gray-300 dark:border-gray-200/40 p-4 rounded">
        <CategoryChart chartData={categoryPosts} />
        </div>

        <div className="grow bg-gray-200  dark:bg-primaryDark  dark:border border-gray-300 dark:border-gray-200/40 p-4 rounded">
          <h2 className="font-semibold">Recent Posts</h2>
        </div>
      </div>

    </div>
  );
};

export default DashInsights;
