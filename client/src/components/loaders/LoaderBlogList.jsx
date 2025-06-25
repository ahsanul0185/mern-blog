import React from 'react'

const LoaderBlogList = () => {
  return (
    <div className='w-full h-full flex flex-col gap-5'>
        {new Array(6).fill(0).map((_, idx) => (
            <div style={{ animationDelay: `${idx * 200}ms` }} key={idx} className='relative bg-gray-200 dark:bg-primaryDark w-full h-22 md:h-32 rounded p-3 flex gap-4 animate-pulse'>
                <div className='bg-gray-300 dark:bg-primary/20 h-full aspect-square rounded'></div>
                <div className='flex flex-col h-full w-full gap-2'>
                    <div className='bg-gray-300 dark:bg-primary/20 h-10 w-2/3 rounded'></div>
                    <div className='bg-gray-300 dark:bg-primary/20 h-5 w-1/2 rounded'></div>
                    <div className='bg-gray-300 dark:bg-primary/20 h-5 w-1/2 rounded'></div>
                </div>
                    <div className='absolute top-2 right-2 bg-gray-300 dark:bg-primary/20 h-5 w-12 rounded'></div>
                
                <div></div>
            </div>
        ))}
    </div>
  )
}

export default LoaderBlogList