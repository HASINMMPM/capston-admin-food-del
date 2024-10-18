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
         <div className="flex w-full justify-center items-center text-lg md:text-2xl">
           <p>
            You are not logged in.{" "}
            <span onClick={() => setLoginPage(true)} className="text-primary underline cursor-pointer">
              Click here to Login
            </span>
          </p>
         </div>
        ) : (
          <Outlet />
        )}
      </div>
      <Footer />
    </main>
  );
}
