import React, { useEffect, useState } from "react";
import { Table } from "flowbite-react";
import { FaUsersSlash } from "react-icons/fa6";
import { ImCross } from "react-icons/im";
import { useContext } from "react";
import axios from "axios";
import { Context } from "./Global/ContextList";

const OrderAdmin = () => {
  const { isAdmin, URL, token } = useContext(Context);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [resId, setResId] = useState("6711f7cb3fd0cf25723d502a");

  // Fetch orders function
  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${URL}/get/order`, {
        headers: { token },
      });
      const fetchedOrders = response.data;
      console.log("response of order", response.data);
      const filteredOrders = fetchedOrders.filter((order) =>
        order.items.some((item) => item.restaurant === resId)
      );
      setOrders(filteredOrders);

      console.log("filteredOrder", filteredOrders);

      fetchedOrders.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      // setOrders(fetchedOrders);
      setLoading(false);
      fetchAdmin();
      console.log("res id", resId);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch orders.");
      setLoading(false);
    }
  };

  const fetchAdmin = async () => {
    const admURL = `${URL}/admin/singeladmin/${id}`;
    console.log(admURL);
    try {
      const response = await axios.get(admURL);
      // console.log(response.data)
      // setSingleAdmin(response.data);
      // console.log(response.data.restaurant._id)
      setResId(response.data.restaurant._id);
    } catch (error) {
      console.error("Error fetching admin data:", error);
      console.log(error.response.data);
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
      fetchOrders();
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [URL, token]);

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center">
        <p>Loading orders...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full flex justify-center items-center">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="w-full py-4 lg:py-14 px-0 lg:px-8">
      {orders.length === 0 ? (
        <div className="w-full flex text-primary opacity-25 justify-center items-center h-full">
          <h3>There is no Order</h3>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <Table.Head>
              <Table.HeadCell>Item</Table.HeadCell>
              <Table.HeadCell>User</Table.HeadCell>
              <Table.HeadCell>Amount</Table.HeadCell>
              {/* <Table.HeadCell>Status</Table.HeadCell> */}
              <Table.HeadCell>Address</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {orders.map((order, index) => (
                <Table.Row key={index}>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white uppercase">
                    <div>
                      {order.items.length > 0 ? (
                        // Filter items where restaurant matches resId before mapping
                        order.items
                          .filter((item) => item.restaurant === resId)
                          .map((item, itemIndex) => (
                            <div key={itemIndex}>
                              <span>
                                {item.title} (
                                <span className="font-bold">
                                  {item.quantity}
                                </span>
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
                  {order.userId}
                  </Table.Cell>

                  <Table.Cell>
                    {order.items
                      .filter((item) => item.restaurant === resId)
                      .map((item, itemIndex) => (
                        <div key={itemIndex}>
                          <span>{item.price}</span>
                        </div>
                      ))}
                  </Table.Cell>

                  {/* <Table.Cell>
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
                  </Table.Cell> */}

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

export default OrderAdmin;
