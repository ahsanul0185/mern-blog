import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import DashSidebar from "../components/dashboard/DashSidebar";
import DashProfile from "../components/dashboard/DashProfile";
import useGetTab from "../hooks/useGetTab";
import BlogPosts from "../components/dashboard/BlogPosts";
import { useSelector } from "react-redux";

const Dashboard = () => {

  const {tab} = useGetTab();
  const {currentUser} = useSelector(state => state.userR);

  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-67px)] relative">
      {/* Sidebar */}
      <DashSidebar />


      {/* Profile */}
      <div className='grow p-8'>
      {tab === "profile" && <DashProfile />}
      {currentUser.role === "admin" && tab === "blog_posts" && <BlogPosts />}
      {!tab && <Outlet />}
      </div>
    </div>
  )
}

export default Dashboard