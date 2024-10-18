import React, { useState } from 'react';
import axios from 'axios';
import { useContext } from 'react';
import { Context } from './Global/ContextList';
import { MdDelete } from "react-icons/md";
import Swal from 'sweetalert2';
import { useEffect } from 'react';
import { Table } from "flowbite-react";

const CouponForm = () => {
  const [code, setCode] = useState('');
  const [discount, setDiscount] = useState('');
  const [expiresAt, setExpiresAt] = useState('');
  const [message, setMessage] = useState('');
  const {URL,token} = useContext(Context)
  const [showCoupen, setShowCoupen] =useState(false)
  const [coupen,setCoupen] = useState([])


  useEffect(()=>{
    fetchCoupen()
  },[])

  const handleDeleteCoupon = async (couponId) => {
    try {
      const response = await axios.delete(`${URL}/coupon/delete/${couponId}`, {
        headers: { token },
      });
      console.log(response);
      Swal.fire({
        text: response.data.message,
        icon:'success',
        timer: 2000,
        showConfirmButton: false,
      });
      fetchCoupen()
    } catch (error) {
      console.log(error);
    }
  };
const fetchCoupen =async ()=>{
  try {
    const response = await axios.get(`${URL}/coupon/all`);
     setCoupen(response.data)
    console.log("coupens",setCoupen)
  } catch (error) {
    console.log(error);
  }
}

  const handleCouponSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${URL}/coupon/create`,
        { code, discount, expiresAt },
        {
          headers: {
           token
          },
        }
      );
      console.log(response)
      Swal.fire({
        text: response.data.message + expiresAt,
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
      setMessage('Coupon created successfully!');
      setTimeout(() => {
        location.reload();
      }, 2000);
    } catch (error) {
      setMessage('Error creating coupon: ' + error);
    }
  };

  return (
    <div className="w-full ">
{!showCoupen ?
     <div className='md:w-1/2 p-6 bg-white shadow-lg rounded-lg ' >
       <h2 className="text-2xl font-bold mb-4">Create Coupon</h2>
      <form onSubmit={handleCouponSubmit} className="flex flex-col gap-4">
        <div>
          <label htmlFor="code" className="block text-lg font-medium">
            Coupon Code
          </label>
          <input
            type="text"
            id="code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter coupon code"
            required
            className="w-full p-2 border border-gray-300 rounded uppercase"
          />
        </div>

        <div>
          <label htmlFor="discount" className="block text-lg font-medium">
            Discount (%)
          </label>
          <input
            type="number"
            id="discount"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            placeholder="Enter discount percentage"
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label htmlFor="expiresAt" className="block text-lg font-medium">
            Expiry Date
          </label>
          <input
            type="date"
            id="expiresAt"
            value={expiresAt}
            onChange={(e) => setExpiresAt(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <button
          type="submit"
          className="bg-primary text-white py-2 rounded hover:bg-secondary hover:text-primary duration-300"
        >
          Create Coupon
        </button>

        {message && <p className="text-lg mt-2 text-red-600">{message}</p>}
      </form>
      <div className="flex flex-col items-center">
      <button
      onClick={()=>setShowCoupen(true)} 
      className=' bg-secondary py-2 px-6 border-2 border-primary rounded-lg hover:font-bold duration-300 my-6 '>Show all coupen</button>
      </div>
     </div>:<>
     <div className="w-full">
    <button className='text-center my-16 '>All Coupens</button>
    <Table>
            <Table.Head>
              <Table.HeadCell>Coupen</Table.HeadCell>
              <Table.HeadCell>Discount</Table.HeadCell>
              <Table.HeadCell>last date</Table.HeadCell>
              <Table.HeadCell className="w-[20%]">delete</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {coupen.map((coupon) => (
                <Table.Row key={Comment._id}>
                  <Table.Cell>{coupon.code}</Table.Cell>
                  <Table.Cell>{coupon.discount}%</Table.Cell>
                  <Table.Cell>{coupon.expiresAt}</Table.Cell>
                  <Table.Cell>
                  <button onClick={()=>handleDeleteCoupon(coupon._id)}
                    className=' text-danger p-2'><MdDelete/> </button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
          <div className="flex justify-center">

     <button className='my-16 bg-primary rounded-lg hover:bg-black duration-300 text-white px-6 py-3 ' onClick={()=>setShowCoupen(false)}>Create Coupon</button>
          </div>
     </div>
     </>}
    </div>
  );
};

export default CouponForm;
