import { Outlet } from "react-router-dom";
import "flowbite/dist/flowbite.css";
import Header from "./component/Header";
import Sidebar from "./component/Sidebar";
import Login from "./component/Login";
import { useContext } from "react";
import Footer from "./component/Footer";
import { Context } from "./component/Global/ContextList";

export default function App() {
  const { loginPage, setLoginPage, token } = useContext(Context);

  return (
    <main className="max-w-screen-2xl mx-auto">
      {loginPage && <Login setLoginPage={setLoginPage} />}
      <Header setLoginPage={setLoginPage} />
      <div className="flex flex-row">
        <Sidebar />
       
        {!token ? (
          <p>
            You are not logged in.{" "}
            <span onClick={() => setLoginPage(true)} className="text-blue-500 cursor-pointer">
              Click here to Login
            </span>
          </p>
        ) : (
          <Outlet />
        )}
      </div>
      <Footer />
    </main>
  );
}
