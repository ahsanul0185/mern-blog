import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const Search = () => {

    const location = useLocation();

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);

      console.log(urlParams.get("searchTerm"));
    }, [])
    

  return (
    <div className='default-padding'>Search</div>
  )
}

export default Search