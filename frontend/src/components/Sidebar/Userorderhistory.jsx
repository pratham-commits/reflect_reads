import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import Loader from '../Loader/Loader';
import { Link } from 'react-router-dom';

const Userorderhistory = () => {
  const [orderHistory, setorderHistory] = useState();
  const headers = {
    user_id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  useEffect(() => {
    const fetch = async()=>{
      const response = await axios.get("http://localhost:1000/api/v1/get-user-history-for-users",{headers});
      setorderHistory(response.data.data);
    };
    fetch();

  }, [])
  
  return (
    <>
    {!orderHistory && <div className='h-screen bg-zinc-900 flex items-center justify-center'><Loader /></div>}
    {orderHistory && orderHistory.length === 0 && (
      <div className='h-[80vh] p-4 text-zinc-100'>
        <div className='h-[100%] flex flex-col items-center justify-center'>
          <h1 className='text-5xl font-semibold text-zinc-500 mb-8'>
            No Order History
          </h1>
          <img src="https://i.postimg.cc/Tw91rD3m/rb-293.png" alt="" className='h-[20vh] mb-8' />

        </div>
      </div>
    )}
    {orderHistory && orderHistory.length>0 && (
      <div className='h-[100%] p-0 text-zinc-100'>
        <h1 className='text-3xl font:semibold text-zinc-500 mb-8'>
          Your Order History
        </h1>
        <div className='mt-4 bg-zinc-800 w-full rounded py-2 px-4 flex gap-2'>
          <div className='w-[3%]'>
            <h1 className='text-center'>Sr.</h1>
          </div>
          <div className='w-[22%]'>
            <h1 className='text-center'>Books</h1>
          </div>
          <div className='w-[45%]'>
            <h1 className='text-center'>Description</h1>
          </div>
          <div className='w-[9%]'>
            <h1 className='text-center'>Price</h1>
          </div>
          <div className='w-[16%]'>
            <h1 className='text-center'>Status</h1>
          </div>
          <div className='hidden w-none'>
            <h1 className='text-center'>Mode</h1>
          </div>
        </div>
        {orderHistory.map((items,i)=>(
          
        <div className='mt-4 bg-zinc-800 w-full rounded py-2 px-4 flex gap-2 hover:bg-zinc-900'>
        <div className='w-[3%]'>
          <h1 className='text-center'>{i+1}</h1>
        </div>
        <div className='w-[22%]'>
          <h1 className='text-center'>
            <Link className="hover:text-blue-300" to ={`/get-book-by-id/${items.book._id}` }>{items.book.title}</Link>
          </h1>
        </div>
        <div className='w-[45%]'>
          <h1 className=''>{items.book.desc.slice(0,50)} ...</h1>
        </div>
        <div className='w-[9%]'>
          <h1 className='text-center'>₹ {items.book.price}
          </h1>
        </div>
        <div className='w-[16%]'>
          <h1 className='font-semibold text-green-500 text-center'> 
            {items.status === "Order Placed"? (
            <div className='text-yellow-500'>{items.status}</div>
          ): items.status === "Cancelled"?(
            <div className='text-red-500'>{items.status}</div>
          ):(items.status)
            
          }</h1>
        </div>
        <div className='hidden w-none'>
          <h1 className='text-center'>Mode</h1>
        </div>
      </div>
          

        ))}
      </div>
    )}
    </>
  )
}

export default Userorderhistory