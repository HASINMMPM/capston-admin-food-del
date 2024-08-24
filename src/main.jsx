import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./ErrorHandke.jsx";
import AllAdmin from "./component/AllAdmin.jsx";
import AllRes from "./component/AllRes.jsx";
import VerifyRes from "./component/VerifyRes.jsx";
import ContextList from "./component/Global/ContextList.jsx";
import AllFood from "./component/AllFood.jsx";
import AddRestaurent from "./component/AddRestaurent.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element:
        <div className="flex justify-center items-center w-full">
          <h1 className="text-xl text-center font-bold font-sub-heading text-primary">Admin Dashboard</h1>,
        </div>
          
      },
      {
        path: "/alladmin",
        element: <AllAdmin />,
      },
      {
        path: "/allrestaurent",
        element: <AllRes />,
      },
      {
        path: "/verifyrestaurent",
        element: <VerifyRes />,
      },
      {
        path: "/allfoods",
        element: <AllFood />,
      },
      {
        path: "/addrestaurent",
        element: <AddRestaurent />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <ContextList>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </ContextList>
);
