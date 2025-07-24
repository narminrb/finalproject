import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "./layout";
import HomePage from "./pages/homePage";
import BlogPage from "./pages/blogPage";
import AboutPage from "./pages/aboutPage";
import BlogDetailPage from "./pages/blogDetailPage";
import ContactPage from "./pages/contactPage";
import ShopPage from "./pages/shopPage";
import ShopDetailPage from "./pages/shopDetailPage";
import Register from "./pages/registerPage";
import Login from "./pages/loginPage";
import PrivateRoute from "./pages/admin/component/ProtectedRoute";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminPage from "./pages/admin/AdminPage";
import AdminBlog from "./pages/admin/AdminBlog";
import AdminShop from "./pages/admin/AdminShop";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true, 
          element: <HomePage/>,
        },
        {
          path: "blog",
          element: <BlogPage/>,
        }
        ,
        {
          path: "blog/:id",
          element: <BlogDetailPage/>,
        }
        ,
        {
          path: "aboutus",
          element: <AboutPage/>,
        },
        {
          path: "contactus",
          element: <ContactPage/>,
        },
        {
          path:"shop",
          element:<ShopPage/>
        }, 
        {
          path: "shop/:id",
          element: <ShopDetailPage/>,
        },
        
        
      ],
    },
    { 
      path: "register", 
      element: <Register /> 
    },
    { 
      path: "login", 
      element: <Login /> 
    },
    {
      path: "/admin",
      element: (
        <PrivateRoute>
          <AdminLayout />
        </PrivateRoute>
      ),
      children: [
        { index: true, element: <AdminPage /> },
        // { path: "about", element: <AdminAbout /> },
        { path: "blog", element: <AdminBlog /> },
        { path: "shop", element: <AdminShop /> },
        // { path: "news", element: <AdminNews /> },
        // { path: "contact", element: <AdminContact /> },
        // { path: "career", element: <AdminCareer /> },
        // { path: "services", element: <AdminService /> },
        // { path: "profile", element: <AdminProfile /> },
        // { path: "reset-password", element: <AdminResetPassword /> },
        // { path: "reset-email", element: <ResetEmailPage /> },
      ],
    },
  ]);