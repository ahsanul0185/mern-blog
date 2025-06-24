import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import DashSidebar from "../components/dashboard/DashSidebar";
import DashProfile from "../components/dashboard/DashProfile";
import useGetTab from "../hooks/useGetTab";
import { useSelector } from "react-redux";
import DashPosts from "../components/dashboard/DashPosts";

const Dashboard = () => {
  const { tab } = useGetTab();
  const { currentUser } = useSelector((state) => state.userR);

  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-67px)] relative overflow-x-clip">
      {/* Sidebar */}
      <DashSidebar />

      {/* Dashboard */}
      <div className="grow p-4 md:p-8 overflow-x-auto max-w-6xl w-full mx-auto md:pb-16">
        {/* Tabs */}
        {tab === "profile" && <DashProfile />}
        {currentUser.role === "admin" && tab === "blog_posts" && <DashPosts />}

        {/* Admin Routes */}
        {!tab && <Outlet />}
      </div>
    </div>
  );
};

export default Dashboard;
