import React, { useEffect } from "react";
import logo from "/Logo.png";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "./Global/ContextList";
import { useContext } from "react";

const Header = ({ setLoginPage }) => {
  const { setToken,token,role } = useContext(Context);
  const navigate = useNavigate();
  useEffect(() => {
    const cookies = document.cookie.split("; ").reduce((acc, cookie) => {
      const [key, value] = cookie.split("=");
      acc[key] = value;
      return acc;
    }, {});
    // console.log("cookies",cookies)

    if (cookies.token) {
      setToken(cookies.token);

    }
  }, [setToken]);

  const logout = (req, res) => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/"; // Clear the token cookie
    setToken(null);
    location.reload();
    navigate("/");
    setLoginPage(true); // Show the login page when the user logs out
  };
  return (
    <header className="bg-secondary max-w-screen-2xl divide-x divide-primary  container mx-auto">
      <div className="flex flex-row justify-between items-center pr-4">
        <Link to="/">
          <img src={logo} alt="logo" className="w-16 md:w-32 h-16 md:h-32" />
        </Link>
        <div className="flex flex-col justify-center items-center">
        <p className="text-lg md:text-2xl font-bold text-primary font-heading">
          Admin Panel
        </p>
        <p className="text-primary">{role}</p>

        </div>
        {token? 
         (
           <button
           onClick={() => logout()}
           className="text-sm md:text-md rounded-md   text-white hover:text-black duration-500 bg-red-600 hover:bg-transparent py-2 px-4 hover:border-primary border-0 hover:border-2"
           >
            Log Out
          </button>
        ):
        (
          <button
            onClick={() => setLoginPage(true)}
            className="text-sm md:text-md rounded-md   text-white hover:text-black duration-500 bg-primary hover:bg-transparent py-2 px-4 hover:border-primary border-0 hover:border-2"
          >
            Signup
          </button>
        ) 
      }
      </div>
    </header>
  );
};

export default Header;


