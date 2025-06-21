import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';

const useGetTab = () => {

const location = useLocation();
  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    setTab(tabFromUrl);
  }, [location.search])

  return {tab, setTab, path : location.pathname.slice(1, location.pathname.length)}
}

export default useGetTab