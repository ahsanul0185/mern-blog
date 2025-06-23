import { useSelector } from 'react-redux'
import {Outlet, Navigate} from 'react-router-dom'

const AdminRoutes = () => {
    const {currentUser} = useSelector(state => state.userR);
  return currentUser && currentUser.role === "admin" ? <Outlet /> : currentUser.role === "user"? <Navigate to="/" /> : <Navigate to="/sign-in"/>
}

export default AdminRoutes