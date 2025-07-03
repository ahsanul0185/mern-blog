import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'sonner';
import LoaderAllBlogPage from '../components/loaders/LoaderAllBlogPage';
import NewsLetter from '../components/hero/NewsLetter';
import PostCard from '../components/hero/PostCard';
import Loader from '../components/loaders/Loader';

const Search = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const [searchData, setSearchData] = useState({
      searchTerm : "",
      sort  : "",
      category : ""
    });

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [hasMore, setHasMore] = useState(true);


    const fetchPosts = async (startIndex = 0) => {
      try {
        setLoading(true)
        setError(null);
        const urlParams = new URLSearchParams(location.search);
        const searchQuery = urlParams.toString();

        console.log(searchQuery)
        const res = await axios.get(`/api/post/get_posts?startIndex=${startIndex}&${searchQuery}`);

        if (res.status === 200) {
          setPosts(prev => [...prev, ...res.data.posts]);
        }
        if (res.data.posts.length === 9) {
          setHasMore(true);
        }else{
          setHasMore(false)
        }

        if (res.data.posts.length === 0) {
          setLoading(false);
          setError("No posts found!")
        }

      } catch (error) {
        console.log(error)
        toast.error("Could load posts");
      }finally {
        setLoading(false);
      }
    }


  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const sortFromUrl = urlParams.get("sort");
    const categoryFromUrl = urlParams.get("category");

    if (searchTermFromUrl || sortFromUrl || categoryFromUrl) {
      setSearchData(prev => ({
        ...prev, 
        searchTerm : searchTermFromUrl,
        sort : sortFromUrl,
        category : categoryFromUrl
      }))
    }else {
         setSearchData(prev => ({
        ...prev, 
        searchTerm : "",
        sort : "",
        category : ""
      }))
    }

    setPosts([]);
    fetchPosts();
  }, [location.search]);


  const handleChange = async (e) => {
    const urlParams = new URLSearchParams(location.search);

    if (e.target.value.trim() === "") {
      urlParams.delete(e.target.name)
    }else{
      urlParams.set(e.target.name, e.target.value);
    }

    navigate(`?${urlParams.toString()}`);

    setSearchData(prev => ({...prev, [e.target.name] : e.target.value}));
  }


    useEffect(() => {
      const handleScroll = () => {
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  
        if (scrollTop + clientHeight + 550 >= scrollHeight && hasMore && !loading) {
          fetchPosts(posts.length);
        }
      };
  
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, [hasMore, loading]);


  return (
    <>
    <div className='default-padding'>
      {searchData.searchTerm && <h2 className='text-2xl text-gray-700 dark:text-gray-200'>Search Results for "{searchData.searchTerm}"</h2>}

      <div className='my-5'>
        {/* Filter Options */}
        <div className='flex items-center justify-end gap-5'>
          <div className='flex items-center gap-2'>
            <label htmlFor="sort">Sort : </label>
            <select name='sort' id="sort" onChange={handleChange} value={searchData.sort || ""} className='input-field-style max-w-fit py-1'>
              <option value="desc" className='text-black'>Latest</option>
              <option value="asc" className='text-black'>Oldest</option>
            </select>
          </div>
          <div className='flex items-center gap-2'>
            <label htmlFor="category">Category : </label>
            <select name='category' id="category" onChange={handleChange} value={searchData.category || ""} className='input-field-style max-w-fit py-1'>
                  <option value="" className='text-black'>
                    All
                  </option>
                  <option value="technology" className='text-black'>Technology</option>
                  <option value="programming" className='text-black'> Programming</option>
                  <option value="travel" className='text-black'>Travel</option>
                  <option value="health" className='text-black'>Health</option>
            </select>
          </div>
        </div>

        {/* Blog Grid */}
        <div className='min-h-screen relative pb-20'>
        {posts.length === 0 && loading ? (
          <LoaderAllBlogPage />
        ) : (posts.length === 0 && error) ? (<h2 className='absolute top-[30%] left-1/2 -translate-x-1/2 text-2xl font-semibold italic text-center'>{error}</h2>) : (
          <div className="mt-14 grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-12 gap-y-10">
            {posts.length > 0 && posts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        )}

        {/* Loader */}
        {loading && hasMore && (
          <div className="">
            <LoaderAllBlogPage />
          </div>
        )}

        {/* End Message */}
        {/* {!hasMore && (
          <div className="mt-12 text-center text-sm text-gray-400">
            You've reached the end. 🎉
          </div>
        )} */}
      </div>
      </div>

    </div>
      <NewsLetter />
      </>
  )
}

export default Search