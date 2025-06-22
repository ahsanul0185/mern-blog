import { IoMdPerson } from "react-icons/io";
import { BiLogOutCircle } from "react-icons/bi";
import useGetTab from "../../hooks/useGetTab";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { signOut } from "../../features/user/userSlice";

const sidebarItems = [
  {
    id : "profile",
    title : "Profile",
    icon : <IoMdPerson className="text-xl"/>,
    path : "/dashboard?tab=profile",
    action : ""
  },
  {
    id : "signout",
    title : "Sign Out",
    action : "signout",
    path : "/sign-in",
  },
]



const DashSidebar = () => {

    const {currentUser} = useSelector(state => state.userR);
    const {tab} = useGetTab();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSignout = () => {
          dispatch(signOut()); 
          navigate("/sign-in");
    }


  return (
    <div className="md:h-[calc(100vh-67px)] md:sticky top-[67px] left-0 dark:bg-primaryDark md:w-72 border-b-gray-200 border-b md:border-b-0 border-r-0 dark:border-b-gray-200/40 md:border-r md:border-r-gray-200 dark:border-r-gray-200/40 px-4 py-6">

      <div>
        <img src={currentUser.profilePicture} alt="profile"  className="mx-auto rounded-full size-16 md:size-20"/>
        <p className="text-center font-semibold text-gray-500 dark:text-gray-300 mt-3 text-sm md:text-base">{currentUser.email}</p>
      </div>

      <div className="flex flex-col gap-2 mt-8 text-sm md:text-base">
        {sidebarItems.map((item, idx) => <div className="relative" key={item.id}>
        {item.id === "profile" && <span className="bg-dark text-white absolute top-1/2 -translate-y-1/2 right-2 px-1.5 py-0.5 text-xs rounded">User</span>}
        <Link to={item.path ? item.path : ""} className={`flex items-center gap-4 py-2 px-2  w-full rounded cursor-pointer ${item.id === tab ? "bg-primary text-white dark:bg-primary/40" : "hover:bg-primary/40"}`}>{item.icon} {item.title}</Link>
      </div>)}

      <button onClick={handleSignout} className="flex items-center gap-4 py-2 px-2  w-full rounded cursor-pointer hover:bg-primary/40"><BiLogOutCircle className="text-xl"/> Sign Out</button>
      </div>
    </div>
  )
}

export default DashSidebar