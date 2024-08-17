import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./ErrorHandke.jsx";
import AllAdmin from "./component/AllAdmin.jsx";
import AllRes from "./component/AllRes.jsx";
import VerifyRes from "./component/VerifyRes.jsx"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <h1>Admin Dashboard</h1>,
      },
      {
        path: "/alladmin",
        element: <AllAdmin />,
      },
      {
        path: "/allrestaurent",
        element: <AllRes />,
      },    {
        path: "/verifyrestaurent",
        element: <VerifyRes/>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
