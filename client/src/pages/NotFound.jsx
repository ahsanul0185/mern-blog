import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className='default-padding min-h-[80vh] grid place-items-center'>
        <div className='flex flex-col items-center gap-6'>
            <h2 className='text-2xl md:text-4xl font-bold'>Opps!  Page Not Found : (</h2>
            <Link to="/" className='button-primary'>Back to Home</Link>
        </div>
    </div>
  )
}

export default NotFound