import axios from "axios";
import { useEffect, useState } from "react";
import { createContext } from "react";

export const ResContext = createContext();
const ResGlobal = (props) => {
  const URL = "http://localhost:3000/v1";
  const [res, setRes] = useState([]);
  const [verifyres, setVerifyRes] = useState([]);

  useEffect(() => {
    const fetchRes = async () => {
      try {
        const response = await axios.get(`${URL}/restuarant/allrestaurant`);
        const resData = response.data;
        // console.log(resData);
        setRes(resData);
      } catch (error) {
        console.error("Error fetching res data:", error);
      }
    };

    fetchRes();
  }, [setRes]);
  useEffect(() => {
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

    ferchVerifyRes();
  }, [setVerifyRes]);

  const deleteRes = async (resid) => {
    console.log(resid);
    try {
      const response = await axios.delete(
        `${URL}/restuarant/deletrestauran/${resid}`
      );
      console.log(response.data);

      setRes((prevRes) => prevRes.filter((res) => res._id !== resid));
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

      // Assuming the API returns the updated restaurant data, you can update the state
      setRes((prevRes) =>
        prevRes.map((res) =>
          res._id === resid ? { ...res, BestRestaurant: true } : res
        )
      );
    } catch (error) {
      console.error("Error updating restaurant:", error);
    }
  };
  const conformRes = async (resid) => {
    console.log(resid);
    try {
      const response = await axios.post(
        `${URL}/addrestuarant/${resid}`
      );
      console.log(response.data);
  }catch(error){
    console.error("Error updating restaurant:", error);
  }}

  const resValue = {
    res,
    deleteRes,
    topRes,
    verifyres,conformRes
  };

  return (
    <ResContext.Provider value={resValue}>{props.children}</ResContext.Provider>
  );
};

export default ResGlobal;
