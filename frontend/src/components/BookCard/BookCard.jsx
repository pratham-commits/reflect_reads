import React from 'react';
import {Link} from "react-router-dom";
import axios from 'axios';
import { IoIosRemoveCircleOutline } from "react-icons/io";

const BookCard = ({data,isfav}) => {
  const headers ={
    user_id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    book_id : data._id,
  }

  const handleremoval = async()=>{
    const response = await axios.delete("http://localhost:1000/api/v1/delete-from-favourites",{headers});
    alert(response.data.message);
  }
    
    
  return (
    <div className='bg-zinc-800 rounded p-4 flex flex-col'>
  <Link to={`/view-book-details/${data._id}`}>
  <div className=''>
    <div className='bg-zinc-900 rounded flex items-center justify-center'>
        <img src={data.url} alt="book images" className='h-[25vh] rounded ' />
        </div>
    <h2 className='mt-4 text-lg text-white font-semibold'>{data.title}</h2>
    <p className='mt-2 text-white font-semibold text-base'>by {data.author}</p>
    <p className='mt-2 text-white font-semibold text-xl text-base'>&#8377; {data.price}</p>
   
  </div>
  </Link>
  {isfav && ( <button onClick={handleremoval} className='bg-white-900 px-4 py-2 rounded border-red-500 text-red-500 hover:bg-red-500 hover:text-white mt-4 flex items-center justify-center'><IoIosRemoveCircleOutline /></button>)}
   

  
  </div>
  );
  
    
  
}

export default BookCard