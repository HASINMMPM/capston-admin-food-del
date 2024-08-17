import { createContext, useEffect, useState } from "react";
import axios from 'axios';

export const AdminContext = createContext();

const AdminGlobal = (props) => {
  const URL = "http://localhost:3000/v1";
  const [admin, setAdmin] = useState([]);

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const response = await axios.get(`${URL}/admin/getalladmin`);
        const adminData = response.data;
        // console.log(adminData);
        setAdmin(adminData);
      } catch (error) {
        console.error("Error fetching admin data:", error);
      }
    };

    fetchAdmin();
  }, []);

  const deleteAdmin = async (adminId) => {
    console.log(adminId)
    try {
      const response = await axios.delete(`${URL}/admin/deleteadmin/${adminId}`);
      console.log(response.data);

    
      setAdmin(prevAdmin => prevAdmin.filter(admin => admin._id !== adminId));
    } catch (error) {
      console.error("Error deleting admin:", error);
    }
  };

  const adminValue = {
    URL,
    admin,
    setAdmin,
    deleteAdmin,
  };

  return (
    <AdminContext.Provider value={adminValue}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminGlobal;
