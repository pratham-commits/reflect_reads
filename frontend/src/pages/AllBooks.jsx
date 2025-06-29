import React, { useState,useEffect } from 'react';
import axios from 'axios';

import Loader from '../components/Loader/Loader'
import BookCard from '../components/BookCard/BookCard'


const AllBooks = () => {
  
  const [Data,setData] = useState();
  useEffect(() => {
      const fetch=async ()=>{
          const response = await axios.get("http://localhost:1000/api/v1/get-all-books");
          setData(response.data.data);   
      };
      fetch();
      
  }, []);




  return (
    <div className='bg-zinc-900 px-12 h-auto py-8'>
      {" "}
        
      <h4 className='text-3xl text-yellow-100'> All Books </h4>
        {!Data && <div className='h-screen flex items-center justify-center my-8'><Loader />{" "}</div>}
        <div className='my-8 grid md:grid-cols-4 gap-8  sm:grid-cols-3 grid-cols-1'>
            
            {Data && Data.map((items,i)=>(
                <div key={i}>
                    <BookCard data={items} />{" "}
            </div>
            ))}
        </div>
    </div>
  )
}

export default AllBooks