import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Toaster} from "sonner"
import Home from "./pages/Home";
import About from "./pages/About";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PrivateRoutes from "./routes/PrivateRoutes";
import CreatePost from "./components/dashboard/CreatePost";
import AdminRoutes from "./routes/AdminRoutes";

const App = () => {

  return (
    <BrowserRouter>
      <Header />
      <main className="flex-grow bg-white dark:bg-dark dark:text-gray-100">
      <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/about" element={<About />}/>
          <Route path="/sign-in" element={<SignIn />}/>
          <Route path="/sign-up" element={<SignUp />}/>

          <Route element={<PrivateRoutes/>}>
            <Route path="/dashboard" element={<Dashboard />}>
              <Route element={<AdminRoutes />}>
                <Route path="create-post" element={<CreatePost />}/>
              </Route>
            </Route>
          </Route>

  

          <Route path="/projects" element={<Projects />}/>
      </Routes>
      </main>
      <Footer />

      <Toaster position="bottom-right"/>
      <div id="modal-root"></div>
    </BrowserRouter>
  )
}

export default App