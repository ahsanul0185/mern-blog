import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "sonner";
import Home from "./pages/Home";
import About from "./pages/About";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PrivateRoutes from "./routes/PrivateRoutes";
import CreatePost from "./components/dashboard/CreatePost";
import AdminRoutes from "./routes/AdminRoutes";
import NotFound from "./pages/NotFound";
import UpdatePost from "./components/dashboard/UpdatePost";
import Post from "./pages/Post";
import ScrollToTop from "./components/ScrollToTop";
import Blogs from "./pages/Blogs";
import Search from "./pages/Search";
import VerifyEmail from "./pages/VerifyEmail";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

const App = () => {
  const location = useLocation();
  const hideLayoutRoutes = [
    "/verify-email",
    "/forgot-password",
    "/reset-password",
  ];
  const shouldHideLayout = hideLayoutRoutes.some((route) =>
    location.pathname.startsWith(route)
  );

  return (
    <>
      <ScrollToTop />
      {!shouldHideLayout && <Header />}
      <main className="flex-grow bg-white dark:bg-dark dark:text-gray-100 animate-fadeIn">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          <Route path="/about" element={<About />} />
          <Route path="/search" element={<Search />} />
          <Route path="/all_blogs" element={<Blogs />} />
          <Route path="/post/:slug" element={<Post />} />

          <Route element={<PrivateRoutes />}>
            <Route path="/dashboard" element={<Dashboard />}>
              <Route element={<AdminRoutes />}>
                <Route path="create-post" element={<CreatePost />} />
                <Route path="update-post/:postId" element={<UpdatePost />} />
              </Route>
            </Route>
          </Route>

          <Route path="/*" element={<NotFound />} />
        </Routes>
      </main>
      {!shouldHideLayout && <Footer />}

      <Toaster position="bottom-right" />
      <div id="modal-root"></div>
    </>
  );
};

export default App;
