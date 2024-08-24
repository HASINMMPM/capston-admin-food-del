import { Outlet } from "react-router-dom";
import "flowbite/dist/flowbite.css";

import Header from "./component/Header";
import Sidebar from "./component/Sidebar";
import Login from "./component/Login";
import { useState } from "react";


export default function App() {
  const [loginPage, setLoginPage] = useState(false);
  return (
    
    <main className="max-w-screen-2xl mx-auto ">

      {loginPage && <Login setLoginPage={setLoginPage} />}
      <Header setLoginPage={setLoginPage} />
      <div className="flex flex-row">
        <Sidebar />
        <Outlet />
      </div>
    </main>
  );
}
