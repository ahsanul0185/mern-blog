
import Logo from './Logo'
import { Link } from 'react-router-dom'
import { FaGithub, FaGlobe, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className='bg-primary'>
        <div className='default-padding text-white flex flex-col md:flex-row justify-between items-center gap-6'>
            <div className='flex items-center gap-3 order-2 md:order-1'>
                <div className='flex text-xl gap-2'>
                    <Link to="https://github.com/ahsanul0185" target='_blank' className='hover:text-white/80 duration-300'>
                    <FaGithub />
                </Link>
                <Link to="https://bd.linkedin.com/in/ahsanul0185" target='_blank' className='hover:text-white/80 duration-300'>
                    <FaLinkedinIn />
                </Link>
                <Link to="https://www.ahsanul.dev/" target='_blank' className='hover:text-white/80 duration-300'>
                    <FaGlobe />
                </Link>
                </div>
                <div className='flex flex-col items-start uppercase tracking-wider text-xs'>
                    <Link to="#">Contact Us</Link>
                    <Link to="#">Terms & Conditions</Link>
                </div>
            </div>

            <Logo className="text-2xl text-white font-extralight order-1 md:order-2" />

            <p className='text-sm order-3'>
               ©{new Date().getFullYear()}  Blog by <a href="https://www.ahsanul.dev/" target='_blank'>Ahsanul</a>. All rights reserved.
            </p>
        </div>
    </footer>
  )
}

export default Footer