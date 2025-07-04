import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import DashUsersSkeleton from "../loaders/DashUsersSkeleton";
import { MdOutlineDelete } from "react-icons/md";
import { BsShieldLockFill } from "react-icons/bs";
import Modal from "../Modal";
import { RiAlertFill } from "react-icons/ri";
import moment from "moment";
import { RxCross2 } from "react-icons/rx";
import { FaCheck } from "react-icons/fa6";

const DashUsers = () => {
  const { currentUser } = useSelector((state) => state.userR);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showMore, setShowMore] = useState(false);
  const [showMoreLoading, setShowMoreLoading] = useState(false);
  const [activeModal, setActiveModal] = useState("");
  const [userToDelete, setUserToDelete] = useState(null);

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
        } else {
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
      const res = await axios.get(
        `/api/user/get_users?startIndex=${startIndex}`
      );

      if (res.status === 200) {
        setUsers((prev) => [...prev, ...res.data.users]);
      }

      if (
        res.data.users.length < 10 ||
        res.data.totalUsers === users.length + res.data.users.length
      ) {
        setShowMore(false);
      }

      setShowMoreLoading(false);
    } catch (error) {
      setShowMoreLoading(false);
      toast.error("Could not get users", {
        style: {
          backgroundColor: "#a93800",
          color: "white",
          border: "1px solid rgba(255, 255, 255, 0.4)",
        },
      });
      console.log(error);
    }
  };

  const handleDeleteUser = async () => {

    if (!userToDelete) return

    try {
      const res = await axios.delete(`/api/user/delete/${userToDelete._id}`, {
        data: { password : "" },
      });

      if (res.status === 200) {
        toast.error(res.data.message, {
          style: {
            backgroundColor: "#a93800",
            color: "white",
            border: "1px solid rgba(255, 255, 255, 0.4)",
          },
        });
        setUsers((prev) => prev.filter((user) => user._id !== userToDelete._id));
        setActiveModal(null);
      }
    } catch (error) {
      setActiveModal(null);
      console.log(error);
      toast.error("Could not delete the user", {
        style: {
          backgroundColor: "#a93800",
          color: "white",
          border: "1px solid rgba(255, 255, 255, 0.4)",
        },
      });
    }
  };

  return (
    <div className="">
      <h2 className="text-3xl font-bold">Users List</h2>
      <div className="mt-16">
        {loading ? (
         <DashUsersSkeleton />
        ) : users.length > 0 ? (
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
                    Verified
                  </th>
                  <th scope="col" className="px-6 py-3 text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, idx) => (
                  <tr
                    key={user._id}
                    className={`bg-white dark:bg-primaryDark dark:border-gray-200/30 border-gray-200 hover:bg-primary/10 dark:hover:bg-primary/20 ${
                      idx + 1 === users.length ? "border-b-0" : "border-b"
                    }`}
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium whitespace-nowrap "
                    >
                      {new Date(user.createdAt).toLocaleDateString()}
                    </th>
                    <td className="px-6 py-4">
                      <div className="relative w-fit mx-auto">
                        <img
                          src={user.profilePicture}
                          className="size-9 md:size-12 min-w-fit rounded-full aspect-square object-cover"
                          alt=""
                        />

                        {user.role === "admin" && (
                          <BsShieldLockFill
                            title="Admin"
                            className="absolute bottom-0 right-0 text-teal-400"
                          />
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">@{user.username}</td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">
                      {user.isVerfied ? <FaCheck className="text-green-500" /> : <RxCross2 className="text-red-500" />}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => {
                          setActiveModal("user-delete");
                          setUserToDelete(user);
                        }}
                      >
                        <MdOutlineDelete className="text-[18px] md:text-[22px] text-red-400 hover:text-red-600 duration-200 cursor-pointer" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          !loading && (
            <h2 className="text-2xl font-bold">No users found : ( </h2>
          )
        )}


        {showMore && !loading && (
          <div className="text-center">
            <button
              className={`button-primary mt-5 flex mx-auto gap-2 ${
                showMoreLoading ? "bg-primary/40" : ""
              }`}
              onClick={handleShowMoreUsers}
            >
              {showMoreLoading ? <Loader /> : ""}Show More
            </button>
          </div>
        )}

        <Modal
          showModal={activeModal === "user-delete"}
          setShowModal={setActiveModal}
        >
          <RiAlertFill className="text-7xl mx-auto text-gray-300" />

          {userToDelete && 
          
          <div className="flex gap-3 my-6 bg-primary/40 p-3 rounded">
            <img src={userToDelete.profilePicture} className="size-10 rounded-full" alt="user profile" />
            <div>
              <h2 className="text-gray-600 dark:text-gray-300 font-semibold">@{userToDelete.username}</h2>
              <p className="text-xs">User since {moment(userToDelete.updatedAt).format("Do MMMM YYYY")}</p>
            </div>
          </div>
          }

          <h2 className="font-bold text-xl mt-2">
            Are you sure you want to delete the user?
          </h2>

          <div className="mt-8 flex justify-between">
            <button
              onClick={handleDeleteUser}
              className="button-primary bg-red-600 hover:bg-red-700"
            >
              Confirm Delete
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
    </div>
  );
};

export default DashUsers;
