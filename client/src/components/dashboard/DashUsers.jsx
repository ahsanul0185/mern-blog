import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import Loader from "../Loader";
import { MdOutlineDelete } from "react-icons/md";
import { BsShieldLockFill } from "react-icons/bs";


const DashUsers = () => {
  const { currentUser } = useSelector((state) => state.userR);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showMore, setShowMore] = useState(false);
  const [showMoreLoading, setShowMoreLoading] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      try {
        setLoading(true);
        const res = await axios.get("/api/user/get_users");
        if (res.status === 200) {
          setUsers(res.data.users);
        }
        setLoading(false);
        if (res.data.users.length < 10) {
          setShowMore(false);
        }else {
          setShowMore(true);
        }
      } catch (error) {
        setLoading(false);
        toast("Could not get users", {
          style: {
            backgroundColor: "#a93800",
            color: "white",
            border: "1px solid rgba(255, 255, 255, 0.4)",
          },
        });
        console.log(error);
      }
    };

    if (currentUser.role === "admin") getUsers();
  }, []);

  const handleShowMoreUsers = async () => {
    const startIndex = users.length;

    try {
      setShowMoreLoading(true);
      const res = await axios.get(`/api/user/get_users?startIndex=${startIndex}`);

      if (res.status === 200) {
        setUsers(prev => [...prev, ...res.data.users]);
      }

console.log(res.data.totalUsers, users.length)


      if (res.data.users.length < 10 || res.data.totalUsers === (users.length + res.data.users.length)) {
        setShowMore(false)
      }

      setShowMoreLoading(false);

    } catch (error) {
      setShowMoreLoading(false);
      toast("Could not get users", {
          style: {
            backgroundColor: "#a93800",
            color: "white",
            border: "1px solid rgba(255, 255, 255, 0.4)",
          },
        });
        console.log(error)
    }
  }

  return (
    <div>
      <h2 className="text-3xl font-bold">Users List</h2>
      <div className="mt-16">
        {loading ? (
          <div className="h-full grid place-items-center">
            <Loader lg />
          </div>
        ) : (
            users.length > 0 ?
            <div className="relative overflow-x-auto rounded border border-gray-200 dark:border-gray-200/40 custom-scrollbar">
              <table className="w-full text-sm text-left rtl:text-right text-gray-600 dark:text-gray-200">
                <thead className="text-xs  uppercase bg-primary text-white dark:bg-primary/40">
                  <tr className="dark:border-gray-200/30 border-gray-200 border-b">
                    <th scope="col" className="px-6 py-3">
                      Date Created
                    </th>
                    <th scope="col" className="px-6 py-3">
                      User Profile
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Username
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Role
                    </th>
                    <th scope="col" className="px-6 py-3 text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, idx) => (
                    <tr key={user._id} className={`bg-white dark:bg-primaryDark dark:border-gray-200/30 border-gray-200 hover:bg-primary/10 dark:hover:bg-primary/20 ${idx + 1 === users.length ? "border-b-0" : "border-b"}`}>
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium whitespace-nowrap "
                    >
                      {new Date(user.createdAt).toLocaleDateString()}
                    </th>
                    <td className="px-6 py-4">
                        <div className="relative w-fit mx-auto">
                            <img src={user.profilePicture} className="size-12  rounded-full" alt="" />
                          
                            {user.role === "admin" && <BsShieldLockFill title="Admin" className="absolute bottom-0 right-0 text-teal-400" />}
                 
                        </div>

                    </td>
                    <td className="px-6 py-4">@{user.username}</td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</td>
                    <td className="px-6 py-4 text-right">
                      <button>
                        <MdOutlineDelete className="text-[18px] md:text-[22px] text-red-400 hover:text-red-600 duration-200 cursor-pointer" />
                      </button>
                    </td>
                  </tr>
                  ))}
                </tbody>
              </table>

            </div>
            : 
            
            !loading && <h2 className="text-2xl font-bold">No users found : ( </h2>
            )}
            {showMore && !loading && 
            <div className="text-center">
              <button className={`button-primary mt-5 flex mx-auto gap-2 ${showMoreLoading ? "bg-primary/40" : ""}`} onClick={handleShowMoreUsers}>{showMoreLoading ? <Loader /> : ""}Show More</button>
            </div>
            }
      </div>
    </div>
  );
};

export default DashUsers;
