import React from 'react'
import { Link } from 'react-router-dom'

const SectionTitle = ({title, buttonLink}) => {
  return (
    <div className='pt-5 md:pt-8 pb-8 md:pb-12 flex items-center justify-between'>
        <h2 className='text-xl sm:text-2xl lg:text-4xl font-semibold'>{title}</h2>
        <Link to={buttonLink} className='button-primary px-6 hover:bg-primaryDark duration-300 ease-out'>See All</Link>
    </div>
  )
}

export default SectionTitle