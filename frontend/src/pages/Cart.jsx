import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Loader from "../components/Loader/Loader";
import { RxCross1 } from "react-icons/rx";


const Cart = () => {
  const Navigate=useNavigate();
  const [cart, setCart] = useState(null); // Initialize as null to differentiate between loading and empty state
  const [total, setTotal] = useState(0);
  const headers = {
    user_id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => { 
    const fetchCart = async () => {
      try {
        const response = await axios.get("http://localhost:1000/api/v1/show-cart", { headers });
        console.log(response.data); // Log the response to check its structure
        setCart(response.data.data || []); // Access the correct property in the response
        setTotal(response.data.total || 0); // Adjust this based on your API response structure
      } catch (error) {
        console.error("Error fetching cart data:", error);
        setCart([]); // Set to empty array on error to show empty cart message
      }
    };
    fetchCart();
  }, []);

  useEffect(() => {
    if(cart && cart.length > 0){
      let total = 0;
      cart.forEach((item) => {
        total += item.price;
      });
      setTotal(total);
    }
  }, [cart]);

  if (cart === null) {
    return <div className='flex items-center justify-center h-screen bg-zinc-900'><Loader /></div>; // Show loader while fetching data
  }

  const deleteItem = async (book_id) => {
    try {
      const response = await axios.delete(`http://localhost:1000/api/v1/delete-from-cart/${book_id}`, { headers });
      console.log(response);
      // Update the cart state after deletion
      setCart(cart.filter(item => item._id !== book_id));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };
  const placeorder = async () => {
    try {
      const response = await axios.post("http://localhost:1000/api/v1/place-order", { order: cart }, { headers });
      alert(response.data.message);
      Navigate("/profile/orderHistory");
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order. Please try again.");
    }
  };
  

  return (
    <>
      {cart.length === 0 ? (
        <div className='h-screen bg-zinc-900'>
          <div className='h-full flex items-center justify-center flex-col'>
            <img className='h-[30vh]' src="https://i.postimg.cc/BZL3nYb9/Pngtree-cartoon-shopping-cart-4586974.png" alt="Empty Cart" /> 
            <p className='text-4xl text-white mt-4'>You have nothing in your Cart!!!</p>
          </div> 
        </div>
      ) : (
        <div className='h-screen bg-zinc-900 flex flex-col'>
          <h1 className='text-4xl text-white font-semibold mb-4 p-4'>Your Cart</h1>
          <div className='flex-1 overflow-y-auto p-4'>
            {cart.map((item, i) => (
              <div className='max-w-3xl mx-auto my-2 rounded-lg flex items-center bg-zinc-800 p-3 shadow-md' key={i}>
                <img src={item.url} alt="" className='h-[15vh] object-cover mr-3 rounded-lg' />
                <div className='flex-1'>
                  <h1 className='text-xl text-zinc-100 font-semibold'>{item.title}</h1>
                </div>
                <h2 className='text-zinc-100 text-2xl font-semibold mr-3'>₹ {item.price}</h2>
                <button onClick={() => deleteItem(item._id)} className='hover:text-red hover:bg-white-100 bg-red-100 text-red-700 border-red-700 rounded p-1'>
                  <RxCross1 />
                </button>
              </div>
            ))}
          </div>
          <div className='sticky bottom-0 w-full bg-zinc-900 p-4'>
            <div className='p-3 bg-zinc-800 rounded-lg shadow-md'>
              <h1 className='text-2xl text-zinc-200 font-semibold'>
                Total Amount
              </h1>
              <div className='mt-2 flex items-center justify-between text-lg text-zinc-200'>
                <h2>{cart.length === 1 ? `${cart.length} book` : `${cart.length} books`}</h2>
                <h2>₹ {total}</h2>
              </div>
              <div className='w-full mt-2'>
                <button onClick={placeorder} className='bg-zinc-100 text-zinc-900 mb-2 rounded px-3 py-1 flex justify-center w-full font-semibold hover:bg-zinc-600 hover:text-white'>
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
