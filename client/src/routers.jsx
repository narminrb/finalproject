import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "./layout";
import HomePage from "./pages/homePage";
import BlogPage from "./pages/blogPage";
import AboutPage from "./pages/aboutPage";

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
          path: "aboutus",
          element: <AboutPage/>,
        },
      ],
    },
  ]);