import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { GrLanguage } from "react-icons/gr";
import { useNavigate, useParams } from 'react-router-dom'
import { FaHeart } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import Loader from '../Loader/Loader';
import { useSelector } from 'react-redux';
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from 'react-router-dom';
const ViewBookDetails = () => {
    const {id}=useParams();
    const navigate = useNavigate();
    
    const [Data,setData] = useState();
    const isLoggedIn=useSelector((state)=>state.auth.isLoggedIn);
    const role = useSelector((state)=>state.auth.role);
    console.log(isLoggedIn , role);
    useEffect(() => {
      const fetch=async ()=>{
          const response = await axios.get(`http://localhost:1000/api/v1/get-book-by-id/${id}`);
          
          setData(response.data.data);
            
      };
      fetch();
      
  }, []);
  


  const handlefav = async()=>{
    const headers = {
        user_id: localStorage.getItem("id"),
        authorization : `Bearer ${localStorage.getItem("token")}` ,
        book_id: id,
    }
    const response = await axios.put("http://localhost:1000/api/v1/add-book-to-favourite",{},{headers});
    alert(response.data.message);
  };


  const handlecart = async()=>{
    const headers = {
        user_id: localStorage.getItem("id"),
        authorization : `Bearer ${localStorage.getItem("token")}` ,
        book_id: id,
    }
    const response = await axios.put("http://localhost:1000/api/v1/add-to-cart",{},{headers});
    alert(response.data.message);
  }
  
  const removebook = async()=>{
    const headers = {
      user_id: localStorage.getItem("id"),
      authorization : `Bearer ${localStorage.getItem("token")}` ,
      book_id: id,
  }
    const response=await axios.delete("http://localhost:1000/api/v1/delete-book",{headers});
    alert(response.data.message);
    navigate("/all-books");
  }

  return (
    <>
    {Data && (<div className='px-12 py-8 bg-zinc-900 flex gap-8'>
        <div className='bg-zinc-800 rounded px-4 py-12 h-screen w-3/6 flex items-center justify-center'><img src={Data.url} alt='/' className='h-[70vh]'/> </div>
        {isLoggedIn === true && role==="user" &&<div className='flex md:flex-col'>
            <button onClick={handlefav} className='bg-white rounded-full text-2xl p-2 text-red-600 hover:bg-red-600 hover:text-white'> <FaHeart /></button>
            <button onClick={handlecart} className='hover:bg-white rounded-full text-2xl p-2 mt-4 hover:text-blue-600 bg-blue-600 text-white'> <FaShoppingCart /></button>
        </div>}


        {isLoggedIn === true && role==="admin" &&<div className='flex md:flex-col'>
            <Link to={`/update-book/:${id}`}className='bg-white rounded-full text-2xl p-2 text-black hover:bg-black hover:text-white'> <FaRegEdit /></Link>
            <button onClick={removebook} className='hover:bg-white rounded-full text-2xl p-2 mt-4 hover:text-black bg-black text-white'> <MdDelete /></button>
        </div>}
        
        <div className='p-4 w-3/6'>
        <h1 className='text-4xl text-zinc-300 font-semibold'>{Data.title}</h1>
        <p className='text-zinc-400 mt-1'>by {Data.author}</p>
        <p className='text-zinc-500 mt-4 text-xl'>by {Data.desc}</p>
        <p className='flex mt-4 items-center justify-start text-zinc-400'>
            <GrLanguage className="me-3"/> {Data.language}
        </p>
        <p className='mt-4 text-zinc-100 text-3xl font-semibold'>Price : &#8377; {Data.price}</p>
        
        </div>
    </div>)}

    {!Data && <div className='h-screen bg-zinc-900 flex items-center justify-center'><Loader /></div>}
    </>
  )
}

export default ViewBookDetails