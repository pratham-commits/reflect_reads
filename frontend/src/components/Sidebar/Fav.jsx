import React, { useEffect, useState } from 'react'
import axios from "axios";
import BookCard from "../BookCard/BookCard"
import Loader from "../Loader/Loader"

const Fav = () => {

  const [Favbooks, setFavbooks] = useState();
  useEffect(() => { 
    const fetch = async()=>{
      const headers ={
        user_id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
      };
      const response = await axios.get("http://localhost:1000/api/v1/get-fav-books",{headers});
      setFavbooks(response.data.data);
    };
    fetch();
    
  }, [Favbooks])
  
  return (
    <> 
    {!Favbooks && <Loader />}
    {Favbooks && Favbooks.length === 0 && <><div className=' h-[100%] flex  flex-col justify-center items-center '>
      <img className=' h-[30vh]' src="https://i.postimg.cc/bvwMFTBw/Pngtree-broken-heart-png-6237839.png" alt="" /> 
    <p className='text-4xl text mt-4'>You have nothing in your Favourites!!!</p></div></>}
    <div className='grid grid-cols-4'>
     
     {Favbooks && Favbooks.map((items,i)=><div key={i} className='m-5'><BookCard data={items} isfav={true}/></div>)}
   </div>
    </>
    
  )
}

export default Fav