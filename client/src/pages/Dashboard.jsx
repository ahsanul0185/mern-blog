import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashSidebar from "../components/dashboard/DashSidebar";
import DashProfile from "../components/dashboard/DashProfile";
import useGetTab from "../hooks/useGetTab";

const Dashboard = () => {

  const {tab} = useGetTab();

  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-67px)] relative">
      {/* Sidebar */}
      <DashSidebar />


      {/* Profile */}
      <div className='grow p-8'>
      {tab === "profile" && <DashProfile />}
      </div>
    </div>
  )
}

export default Dashboard