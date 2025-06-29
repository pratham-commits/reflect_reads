import React from 'react';
import { RxCross1 } from "react-icons/rx";

const SeeUserData = ({ userDivData, userDiv, setuserDiv }) => {
  return (
    <div className={`${userDiv} rounded fixed top-0 left-0 h-screen w-full bg-zinc-800 bg-opacity-80 flex items-center justify-center`}>
      <div className='bg-white rounded p-6 w-[80%] max-w-md'>
        <div className='flex justify-between items-center mb-4'>
          <h1 className='text-2xl font-semibold text-black'>User Information</h1>
          <button className='text-red-500' onClick={() => setuserDiv("hidden")}><RxCross1 size={24} /></button>
        </div>
        <div className='mt-2'>
          <label htmlFor="" className='font-semibold text-black'>Username: <span className='font-semibold text-black'>{userDivData.username}</span></label>
        </div>
        <div className='mt-2'>
          <label htmlFor="" className='font-semibold text-black'>Email: <span className='font-semibold text-black'>{userDivData.email}</span></label>
        </div>
        <div className='mt-2'>
          <label htmlFor="" className='font-semibold text-black'>Address: <span className='font-semibold text-black'>{userDivData.address}</span></label>
        </div>
      </div>
    </div>
  );
}

export default SeeUserData;
