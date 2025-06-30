import React from 'react'
import Wave from "../../assets/wave.svg?react"

const NewsLetter = () => {
  return (
    <div className='relative bg-primary dark:bg-black/50 py-22 overflow-clip'>
      <Wave className="absolute -top-40 -left-36 -z-10 hidden w-[70%] lg:w-fit md:block" />

        <div className='default-padding max-w-[90%] md:max-w-[80%] lg:max-w-[60%]'>
            <h2 className='text-center text-xl md:text-2xl lg:text-3xl xl:text-4xl text-white'>Get our stories delivered From us to your inbox weekly.</h2>

            <form className='flex gap-3 max-w-md justify-center mx-auto mt-8'>
                <input type="text" className='input-field-style placeholder:text-gray-400 bg-white dark:bg-transparent text-sm md:text-base' placeholder='Your Email'/>
                <button className='px-5 py-2 text-sm md:text-base rounded text-white shrink-0 cursor-pointer hover:bg-teal-700 bg-primaryDark dark:bg-primary dark:hover:bg-primaryDark duration-300 ease-in-out'>Get Started</button>
            </form>

            <p className='max-w-[80%] mx-auto text-sm text-center text-gray-200 dark:text-gray-400 mt-5'>Get a response tomorrow if you submit by 9pm today. If we received after 9pm will get a reponse the following day.</p>
        </div>
      <Wave className="absolute -bottom-64 -right-36 -z-10 hidden w-[70%] lg:w-fit md:block" />

    </div>
  )
}

export default NewsLetter