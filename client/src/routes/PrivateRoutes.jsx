import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoutes = () => {

    const {currentUser} = useSelector(state => state.userR);

  return currentUser ? <Outlet /> : <Navigate to="sign-in"/>;
}

export default PrivateRoutes