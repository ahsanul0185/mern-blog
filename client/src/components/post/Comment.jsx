import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { RiThumbUpLine } from "react-icons/ri";
import moment from "moment"

const Comment = ({comment}) => {

    const [user, setUser] = useState(null);

    useEffect(() => {
      const getUser = async () => {
        try {
            const res = await axios.get(`/api/user/${comment.userId}`);
            if (res.status === 200) {
                setUser(res.data)
            }
        } catch (error) {
            console.log(error)
        }
      }

      getUser()
    }, [comment])
    
  return (
    <div className='flex gap-3 items-start'>
        <img src={user?.profilePicture || "https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg"} alt="user profile" className="w-10 aspect-square shrink-0 object-cover rounded-full border border-gray-200/40" />
        <div>
            <div className='flex text-sm gap-2 items-center text-gray-600 dark:text-gray-300'>
                <h3 className='font-semibold'>{user ? `@${user.username}` : "Anonymous"}</h3>
            <span className='text-xs'>{moment(comment.createdAt).fromNow()}</span>
            </div>
            <p>{comment.content}</p>
            <div className='text-xs mt-2 flex items-center gap-4'>
                <button><RiThumbUpLine size={16}/></button>
                <button>Reply</button>
            </div>
        </div>

    </div>
  )
}

export default Comment