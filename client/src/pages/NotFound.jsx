import React from 'react'
import { Link } from 'react-router-dom'
import page_not_found from "../assets/404.png"

const NotFound = () => {
  return (
    <div className='default-padding min-h-[80vh] grid place-items-center'>
        <div className='flex flex-col items-center gap-6'>
              <img src={page_not_found} className='w-[80%] md:w-1/2 dark:opacity-80' alt="" />
            <h2 className='text-2xl md:text-4xl font-bold'>Page Not Found</h2>
            <Link to="/" className='button-primary'>Back to Home</Link>
        </div>
    </div>
  )
}

export default NotFound