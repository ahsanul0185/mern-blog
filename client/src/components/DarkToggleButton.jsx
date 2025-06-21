import { IoMoon } from "react-icons/io5";
import { MdSunny } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux'
import { toggleTheme } from '../features/theme/themeSlice';

const DarkToggleButton = () => {

    const dispatch = useDispatch();
    const {theme} = useSelector(state => state.themeR);

  return (
    <button onClick={() => dispatch(toggleTheme())} className="text-xl cursor-pointer">
        {theme === "dark" ? <MdSunny /> : <IoMoon />}
    </button>
  )
}

export default DarkToggleButton