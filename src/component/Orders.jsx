import React, { useEffect, useState } from "react";
import { Table } from "flowbite-react";
import { FaUsersSlash } from "react-icons/fa6";
import { ImCross } from "react-icons/im"; // Import ImCross for not admin case
import { useContext } from "react";
import axios from "axios";
import { Context } from "./Global/ContextList";

const Orders = () => {
  const { isAdmin, URL, token } = useContext(Context);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch orders function
  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${URL}/get/order`, {
        headers: { token },
      });
      const fetchedOrders = response.data;
      console.log("response of order", response);

      // Sorting orders by createdAt field (latest orders first)
      fetchedOrders.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setOrders(fetchedOrders);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch orders.");
      setLoading(false);
    }
  };

  // Function to change order status
  const changeStatus = async (orderId, newStatus) => {
    try {
      console.log(orderId);
      await axios.put(
        `${URL}/change/status/${orderId}`,
        { id: orderId, status: newStatus },
        { headers: { token } }
      );
      fetchOrders(); // Refetch orders after status change
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [URL, token]);

  if (!isAdmin) {
    return (
      <div className="w-full text-red-700 flex flex-col gap-4 justify-center items-center">
        <ImCross className="h-1/2 w-1/2 opacity-30 " />
        <h2 className="text-2xl font-bold">You can't see this page</h2>
      </div>
    );
  }

  // Show a loading spinner or message while fetching data
  if (loading) {
    return (
      <div className="w-full flex justify-center items-center">
        <p>Loading orders...</p>
      </div>
    );
  }

  // Show error message if fetching orders fails
  if (error) {
    return (
      <div className="w-full flex justify-center items-center">
        <p>{error}</p>
      </div>
    );
  }

  // Render orders if data is available
  return (
    <div className="w-full py-4 lg:py-14 px-0 lg:px-8">
      {orders.length === 0 ? (
        <div className="w-full flex text-primary opacity-25 justify-center items-center h-full">
          <FaUsersSlash className="text-2xl md:text-9xl text-center " />
        </div>
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <Table.Head>
              <Table.HeadCell>Item</Table.HeadCell>
              <Table.HeadCell>Restaurant</Table.HeadCell>
              <Table.HeadCell>Amount</Table.HeadCell>
              <Table.HeadCell>Status</Table.HeadCell>
              <Table.HeadCell>Address</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {orders.map((order, index) => (
                <Table.Row key={index}>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white uppercase">
                    <div>
                      {order.items.length > 0 ? (
                        order.items.map((item, itemIndex) => (
                          <div key={itemIndex}>
                            <span>
                              {item.title} (
                              <span className="font-bold">{item.quantity}</span>
                              )
                            </span>
                          </div>
                        ))
                      ) : (
                        <p>No items found in this order.</p>
                      )}
                    </div>
                  </Table.Cell>
                  <Table.Cell>
                    {order.items.map((item, itemIndex) => (
                      <div key={itemIndex}>
                        <span>
                          {item.title} (
                          <span className="font-bold">{item.restaurant}</span>)
                        </span>
                      </div>
                    ))}
                  </Table.Cell>

                  <Table.Cell>₹{order.amount}</Table.Cell>
                  <Table.Cell>
                    <i>
                      <select
                        value={order.status}
                        onChange={(e) =>
                          changeStatus(order._id, e.target.value)
                        }
                      >
                        <option value="pending">Pending</option>
                        <option value="On the way">On the way</option>
                        <option value="delivered">Delivered</option>
                      </select>
                    </i>
                  </Table.Cell>
                  <Table.Cell>
                    <div className="flex flex-col">
                      <span>
                        Name: <strong>{order.name}</strong>
                      </span>
                      <span>
                        Address: <strong>{order.address}</strong>
                      </span>
                      <span>
                        {order.city}, {order.district}, {order.zip}
                      </span>
                    </div>
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

export default Orders;
