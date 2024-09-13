import React, { useState } from 'react';
import axios from 'axios';
import { useContext } from 'react';
import { Context } from './Global/ContextList';
import Swal from 'sweetalert2';

const CouponForm = () => {
  const [code, setCode] = useState('');
  const [discount, setDiscount] = useState('');
  const [expiresAt, setExpiresAt] = useState('');
  const [message, setMessage] = useState('');
  const {URL,token} = useContext(Context)

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
        text: response.data.message,
        icon: "success",
        timer: 1000,
        showConfirmButton: false,
      });
      setMessage('Coupon created successfully!');
      setCode('');
      setDiscount('');
      setExpiresAt('');
    } catch (error) {
      setMessage('Error creating coupon: ' + error);
    }
  };

  return (
    <div className="w-full md:w-1/2 p-6 bg-white shadow-lg rounded-lg">
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
            className="w-full p-2 border border-gray-300 rounded"
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
          className="bg-primary text-white py-2 rounded hover:bg-secondary duration-300"
        >
          Create Coupon
        </button>

        {message && <p className="text-lg mt-2 text-red-600">{message}</p>}
      </form>
    </div>
  );
};

export default CouponForm;
