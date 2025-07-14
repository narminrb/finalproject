import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "./layout";
import HomePage from "./pages/homePage";

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
          path: "drawing",
          element: <div>About page (coming soon)</div>,
        },
      ],
    },
  ]);