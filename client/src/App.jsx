import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Header from "./components/Header";
import MobileMenu2 from "./components/MobileMenu2";
import { useState } from "react";

const App = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <BrowserRouter>
      <Header setIsMenuOpen={setIsMenuOpen}/>
      <MobileMenu2 isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen}/>
      <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/about" element={<About />}/>
          <Route path="/sign-in" element={<SignIn />}/>
          <Route path="/sign-up" element={<SignUp />}/>
          <Route path="/dashboard" element={<Dashboard />}/>
          <Route path="/projects" element={<Projects />}/>
      </Routes>
    
    </BrowserRouter>
  )
}

export default App