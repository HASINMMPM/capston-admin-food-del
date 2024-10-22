import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export const Context = createContext();

const ContextList = (props) => {
  const URL = "https://foodorder-backend-3.onrender.com/v1";
  // const URL = "http://localhost:3000/v1";
  const [admin, setAdmin] = useState([]);
  const [res, setRes] = useState([]);
  const [verifyres, setVerifyRes] = useState([]);
  const [foods, setFoods] = useState([]);
  const [token, setToken] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [role, setRole] = useState(false);
  const[id,setId] =useState()
  const [loginPage, setLoginPage] = useState(false);

  useEffect(() => {
    fetchRes();
    ferchVerifyRes();
    fetchFoods();
    fetchAdmin();
    token;
  }, []);

  // ADMIN
  const fetchAdmin = async () => {
    try {
      const response = await axios.get(`${URL}/admin/getalladmin`);
      const adminData = response.data;
      console.log(adminData);
      setAdmin(adminData);
    } catch (error) {
      console.error("Error fetching admin data:", error);
    }
  };

  const deleteAdmin = async (adminId) => {
    console.log(adminId);
    try {
      const response = await axios.delete(
        `${URL}/admin/deleteadmin/${adminId}`
      );
      console.log(response.data);
      Swal.fire({
        text: "Admin deleted Successfully",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
      setAdmin((prevAdmin) =>
        prevAdmin.filter((admin) => admin._id !== adminId)
      );
    } catch (error) {
      console.error("Error deleting admin:", error);
    }
  };
  useEffect(() => {
    const token = document.cookie.split("=")[1];
    if (token) {
      const decodedToken = jwtDecode(token);
      setRole(decodedToken.role);
      console.log("decodedToken",decodedToken)
      setId(decodedToken.id)
      if (decodedToken.role === "Super admin") {
        setIsAdmin(true);
      }
    }
  }, []);

  // RESTAURENT

  const fetchRes = async () => {
    try {
      const response = await axios.get(`${URL}/restuarant/allrestaurant`);
      const resData = response.data;
      // console.log("resData",resData)
      setRes(resData);
    } catch (error) {
      console.error("Error fetching res data:", error);
    }
  };

  const deleteRes = async (resid) => {
    console.log(resid);
    try {
      const response = await axios.delete(
        `${URL}/restuarant/deletrestauran/${resid}`
      );
      console.log(response.data);
      setRes((prevRes) => prevRes.filter((res) => res._id !== resid));
      location.reload();
    } catch (error) {
      console.error("Error deleting admin:", error);
    }
  };
  const topRes = async (resid) => {
    console.log(resid);
    try {
      const response = await axios.put(
        `${URL}/restuarant/addbestrestaurent/${resid}`,
        { BestRestaurant: true } // Send the update data
      );
      console.log(response.data);

      setRes((prevRes) =>
        prevRes.map((res) =>
          res._id === resid ? { ...res, BestRestaurant: true } : res
        )
      );
      location.reload();
    } catch (error) {
      console.error("Error updating restaurant:", error);
    }
  };

  const ferchVerifyRes = async () => {
    try {
      const response = await axios.get(`${URL}/verify/verifyrestaurant/all`);
      const resData = response.data;
      // console.log(resData);
      setVerifyRes(resData);
    } catch (error) {
      console.error("Error fetching res data:", error);
    }
  };
  // Reject 
  
  const rejectRes = async (resid) => {
    console.log(resid);
  
    try {
      const response = await axios.delete(`${URL}/verify/deletrestauran/${resid}`);
      console.log(response.data);
  
      // Reload the page only if the delete was successful
      if (response.status === 200) {
        location.reload();
      } else {
        console.warn("Failed to delete restaurant. Status:", response.status);
      }
    } catch (error) {
      console.error("Error deleting restaurant:", error);
    }
  };
  
  const conformRes = async (resid) => {
    console.log(resid);
    try {
      const response = await axios.post(
        `${URL}/restuarant/addrestuarant/${resid}`
      );
      console.log(response.data);
      Swal.fire({
        text:response.data,
        icon: "success",
        timer: 2000,
      });
    } catch (error) {
      console.error("Error updating restaurant:", error);
    }
  };

  // FOODS
  const fetchFoods = async () => {
    try {
      const response = await axios.get(`${URL}/food/allfood`);
      const foodData = response.data;
      // console.log(foodData);
      setFoods(foodData);
    } catch (error) {
      console.error("Error fetching food data:", error);
    }
  };
  const removeFood = async (foodId) => {
    console.log(foodId);

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(
            `${URL}/food/deletfood/${foodId}`
          );
          console.log(response.data);

          Swal.fire({
            title: "Deleted!",
            text: "Food has been deleted.",
            icon: "success",
          });

          location.reload(); // Reload the page after successful deletion
        } catch (error) {
          console.error("Error deleting food:", error);

          Swal.fire({
            title: "Error!",
            text: "There was an issue deleting the food. Please try again.",
            icon: "error",
          });
        }
      }
    });
  };

  const popularDish = async (foodId) => {
    console.log(foodId);
    try {
      const response = await axios.put(`${URL}/food/editfood/${foodId}`);
      console.log(response.data);
      setRes((prevRes) =>
        prevRes.map((food) => (food._id === foodId ? response.data : food))
      );
      location.reload();
    } catch (error) {
      console.error("Error updating food:", error);
    }
  };

  const contextValue = {
    URL,
    admin,
    setAdmin,
    deleteAdmin,
    res,
    deleteRes,
    topRes,
    verifyres,
    rejectRes,
    conformRes,
    foods,
    removeFood,
    popularDish,
    setToken,
    token,
    isAdmin,
    setIsAdmin,
    role,
    id,
    loginPage,setLoginPage
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextList;
