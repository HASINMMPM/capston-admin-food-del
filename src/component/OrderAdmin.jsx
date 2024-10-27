import React, { useEffect, useState } from "react";
import { Table } from "flowbite-react";
import { useContext } from "react";
import axios from "axios";
import { Context } from "./Global/ContextList";

const OrderAdmin = () => {
  const { URL, token, id } = useContext(Context);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [resId, setResId] = useState("");


  const fetchAdmin = async () => {
    const admURL = `${URL}/admin/singeladmin/${id}`;
    try {
      const response = await axios.get(admURL);
      setResId(response.data.restaurant._id);
    } catch (error) {
      console.error("Error fetching admin data:", error);
    }
  };

  
  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${URL}/get/order`, {
        headers: { token },
      });
      const fetchedOrders = response.data;

    
      const filteredOrders = fetchedOrders
        .filter((order) =>
          order.items.some((item) => item.restaurant === resId) && order.status === 'pending'
        )
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      
      setOrders(filteredOrders);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch orders.");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchAdmin();
    }
  }, [URL, token, id]);

  useEffect(() => {
    if (resId) {
      fetchOrders();
    }
  }, [resId]);

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
              <Table.HeadCell>Status</Table.HeadCell>
              <Table.HeadCell>Address</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {orders.map((order, index) => (
                <Table.Row key={index}>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white uppercase">
                    {order.items
                      .filter((item) => item.restaurant === resId)
                      .map((item, itemIndex) => (
                        <div key={itemIndex}>
                          <span>
                            {item.title} (
                            <span className="font-bold">{item.quantity}</span>)
                          </span>
                        </div>
                      ))}
                  </Table.Cell>

                  <Table.Cell>{order.userId}</Table.Cell>

                  <Table.Cell>
                    {order.items
                      .filter((item) => item.restaurant === resId)
                      .map((item, itemIndex) => (
                        <div key={itemIndex}>
                          <span>{item.price}</span>
                        </div>
                      ))}
                  </Table.Cell>

                  <Table.Cell>
                    <i>{order.status}</i>
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

export default OrderAdmin;
