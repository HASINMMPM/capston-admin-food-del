import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FaEye as EyeIcon, FaEyeSlash as EyeOffIcon } from "react-icons/fa";
import axios from "axios";
import { Context } from "./Global/ContextList";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

// Regular expression for password validation
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/;

const schema = yup
  .object({
    fullName: yup.string().when("signup", {
      is: true,
      then: yup.string().required("Full name is required"),
    }),
    email: yup.string().required("Email is required").email("Invalid email"),
    password: yup
      .string()
      .required("Password is required")
      .matches(
        passwordRegex,
        "Password must include at least one uppercase letter, one lowercase letter, and one number"
      ),
  })
  .required();

const Login = ({ setLoginPage }) => {
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(<EyeIcon />);
  const [title, setTitle] = useState("Signup");
  const { URL, setToken, token } = useContext(Context);
  const navigate = useNavigate();

  const handleToggle = () => {
    setType((prevType) => (prevType === "password" ? "text" : "password"));
    setIcon((prevIcon) =>
      prevIcon.type === EyeIcon ? <EyeOffIcon /> : <EyeIcon />
    );
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const submitSignup = async (data) => {

    try {
      const response = await axios.post(`${URL}/superadminsignup`, data);
      console.log(response);
      const token = response.data.token;
      console.log("Token received:", token);

      setToken(token);
      document.cookie = `token=${token}; path=/; max-age=86400;`;

      setLoginPage(false);
      navigate("/");

      Swal.fire({
        text: "Signup successful",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      console.log(error.response?.data || error.message || "error");
      Swal.fire({
        text: "Signup failed. Please try again.",
        icon: "error",
        timer: 3000,
        showConfirmButton: false,
      });
    }
  };

  const submitLogin = async (data) => {
    try {
      let response;
      let token;
  
      // Attempt Admin Login
      try {
        console.log("try to admin Log")
        response = await axios.post(`${URL}/admin/adminlogin`, data);
        console.log(response.data)
        console.log("Admin login successful");
        navigate("/addrestaurent");
      } catch (error) {
        // If admin login fails and the error status is 400, attempt Super Admin Login
        if (error.response?.status === 400) {
          console.log("Attempting Super Admin login...");
          response = await axios.post(`${URL}/superadminlogin`, data);
          navigate("/"); // Change the route after Super Admin login
          console.log("Super Admin login successful");
        } else {
          throw error; // Throw the error if it's not a 400 status
        }
      }
  
      // Extract token from the response
      token = response?.data?.token;
      if (token) {
        // Set the token in cookies
        setToken(token);
        document.cookie = `token=${token}; path=/; max-age=86400;`;
  
        // Reload page to reflect login status
        setLoginPage(false);
        location.reload();
  
        // Show success alert
        Swal.fire({
          text: "Login successful",
          icon: "success",
          timer: 1000,
          showConfirmButton: false,
        });
      } else {
        throw new Error("Token not received. Login failed.");
      }
  
    } catch (error) {
      // General error handling
      console.error("Login Error:", error.response?.data || error.message);
  
      Swal.fire({
        text: error.response?.data?.msg || "Login failed. Please try again.",
        icon: "error",
        timer: 3000,
        showConfirmButton: false,
      });
    }
  };
  

  return (
    <div className="flex flex-col justify-center items-center h-lvh absolute z-40 max-h-max bg-black/40 max-w-screen-2xl w-full">
      <form
        onSubmit={handleSubmit(title === "Signup" ? submitSignup : submitLogin)}
        className="flex flex-col gap-3 rounded-xl w-3/4 md:w-1/2 mx-auto bg-white overflow-hidden shadow-2xl p-6"
      >
        <h1 className="text-4xl text-center font-semibold text-primary mb-6">
          {title}
        </h1>

        {title === "Signup" && (
          <div className="flex flex-col gap-2">
            <label className="text-primary" htmlFor="fullName">
              Full Name
            </label>
            <input
              {...register("name")}
              className="rounded-md p-2 bg-slate-50 outline-none shadow-md"
              placeholder="Full Name"
            />
            <p className="text-red-600">{errors.fullName?.message}</p>
          </div>
        )}

        <div className="flex flex-col">
          <label className="text-primary" htmlFor="email">
            Email
          </label>
          <input
            {...register("email")}
            className="rounded-md p-2 bg-slate-50 outline-none shadow-md"
            placeholder="Email"
          />
          <p className="text-red-600">{errors.email?.message}</p>
        </div>

        <div className="flex flex-col">
          <label className="text-primary" htmlFor="password">
            Password
          </label>
          <div className="flex flex-row justify-center items-center rounded-md p-2 shadow-md bg-slate-50">
            <input
              type={type}
              {...register("password")}
              className="password outline-transparent bg-slate-50 border-0 w-full"
              placeholder="Password"
            />
            <span onClick={handleToggle} className="cursor-pointer">
              {icon}
            </span>
          </div>
          {title === "Signup" ? (
            <p className="text-red-600">{errors.password?.message}</p>
          ) : (
            <p className="text-red-600">Password is incorrect</p>
          )}
        </div>

        {title === "Signup" && (
          <div className="flex flex-row items-center gap-4">
            <input type="checkbox" required />
            <p>
              By clicking here, I state that I have read and understood the
              terms and conditions
            </p>
          </div>
        )}

        <div className="flex flex-col">
          {title === "Signup" ? (
            <p
              className="cursor-pointer hover:text-blue-800"
              onClick={() => setTitle("Login")}
            >
              I already have an account
            </p>
          ) : (
            <p
              className="cursor-pointer hover:text-blue-800"
              onClick={() => setTitle("Signup")}
            >
              Don't have an account yet?
            </p>
          )}
        </div>

        <button
          type="submit"
          className="rounded-lg bg-primary mt-4 h-8 hover:bg-secondary text-white hover:text-primary transition"
        >
          {title}
        </button>
      </form>

      <button
        onClick={() => setLoginPage(false)}
        className="rounded-full bg-white mt-16 text-md md:text-2xl w-8 md:w-16 h-8 md:h-16 mx-auto"
      >
        x
      </button>
    </div>
  );
};

export default Login;
