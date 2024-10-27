import React, { useContext, useEffect, useState } from "react";
import { Context } from "./Global/ContextList";
import { Table } from "flowbite-react";
import axios from "axios";
import { FaExclamationCircle } from "react-icons/fa";

const AdminFoodshow = () => {
  const [filteredFoods, setFilteredFoods] = useState([]);
  const [resId, setResId] = useState("");
  const [error, setError] = useState(null);
  const { foods, removeFood, token, id, URL } = useContext(Context);


  const fetchAdmin = async () => {
    const admURL = `${URL}/admin/singeladmin/${id}`;
    try {
      const response = await axios.get(admURL);
      setResId(response.data.restaurant._id);
    } catch (error) {
      console.error("Error fetching admin data:", error);
      setError( alert(`${error.response.data.msg} to show Foods`));
    }
  };


  const foodByAdmin = () => {
    const filtered = foods.filter((foodItem) => foodItem.restaurant === resId);
    setFilteredFoods(filtered);
  };


  useEffect(() => {
    if (token) {
      fetchAdmin();
    }
  }, [token, id, URL]);

  useEffect(() => {
    if (resId) {
      foodByAdmin();
    }
  }, [resId, foods]);

  if (!token) {
    return (
      <div className="w-full text-red-700 flex flex-col gap-4 justify-center items-center">
        <h2 className="text-2xl font-bold">Please Log In</h2>
      </div>
    );
  }

  return (
    <div className="w-full py-4 lg:py-14 px-0 lg:px-8">
      {error ? (
        <div className="flex justify-center items-center text-red-600">
          <FaExclamationCircle className="mr-2" />
          <p>{error}</p>
        </div>
      ) : filteredFoods.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          <h3>No foods found for this restaurant.</h3>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <Table.Head>
              <Table.HeadCell>Image</Table.HeadCell>
              <Table.HeadCell>Name</Table.HeadCell>
              <Table.HeadCell>Price</Table.HeadCell>
              <Table.HeadCell>Description</Table.HeadCell>
              <Table.HeadCell>Restaurant</Table.HeadCell>
              <Table.HeadCell>Remove</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {filteredFoods.map((foodItem, index) => (
                <Table.Row key={index}>
                  <Table.Cell>
                    <img
                      src={foodItem.image}
                      alt="Food image"
                      className="h-24 object-contain"
                    />
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white uppercase">
                    {foodItem.title}
                  </Table.Cell>
                  <Table.Cell>{foodItem.price}</Table.Cell>
                  <Table.Cell className="w-1/4 md:w-auto">
                    {foodItem.description}
                  </Table.Cell>
                  <Table.Cell>{foodItem.restaurant}</Table.Cell>
                
                  <Table.Cell>
                    <button
                      className="bg-red-600 p-2 rounded-lg text-white"
                      onClick={() => removeFood(foodItem._id)}
                    >
                      Remove
                    </button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      )}
    </div>
  );
};

export default AdminFoodshow;
