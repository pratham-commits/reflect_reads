import React from 'react'
import Sidebar from '../components/Sidebar/Sidebar'
import { Outlet } from 'react-router-dom'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import Loader from '../components/Loader/Loader'
import { useState } from 'react'

const Profile = () => {
  //const isLoggedIn = useSelector();
  const [Profile, setProfile] = useState();
  const headers = {
    user_id : localStorage.getItem("id"),
    authorization:`Bearer ${localStorage.getItem("token")}`,
  }

  useEffect(() => {
    const fetch = async()=>{
      const response = await axios.get("http://localhost:1000/api/v1/get-user-information",{headers});
      setProfile(response.data);
    };
   

    fetch();
  }, [])
  
  return (
   
    <div className='bg-zinc-900 px-2 flex  w-full h-screen py-8 gap-4 text-white'>
      {!Profile && <div className='w-full h-[100%] flex items-center justify-center'><Loader /></div>}
    {Profile && (<>
      <div className='w-1/6'>
      <Sidebar data={Profile}/>
    </div>
    <div className='w-4/6'>
      <Outlet />
    </div>
    
    </>
      )}
  </div>
    
   
  )
}

export default Profile