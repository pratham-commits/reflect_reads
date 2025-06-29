import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../Loader/Loader';

const Settings = () => {
  const [Profile, setProfile] = useState();
  const [Value, setValue] = useState({ address: "" });
  const headers = {
    user_id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get("http://localhost:1000/api/v1/get-user-information", { headers });
      setProfile(response.data);
      setValue({ address: response.data.address }); // Corrected to response.data.address
    };
    fetch();
  }, []);

  const updateAddress = async () => {
    const response = await axios.put("http://localhost:1000/api/v1/update-address", Value, { headers });
    alert(response.data.message);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValue({ ...Value, [name]: value });
  };

  return (
    <div className='bg-zinc-900 px-2 flex flex-col py-8 gap-4 text-white'>
      {!Profile && (
        <div className='w-full h-[100%] flex items-center justify-center'>
          <Loader />
        </div>
      )}
      {Profile && (
        <div className='h-[100%] p-0 text-zinc-100'>
          <h1 className='text-3xl font-semibold text-zinc-500 mb-8'>Settings</h1>
          <div className='flex flex-col'>
            <div className='flex gap-12'>
              <div className='flex flex-col'>
                <label htmlFor="">Username</label>
                <p className='p-2 rounded bg-zinc-900 mt-2 font-semibold'>{Profile.username}</p>
              </div>
              <div className='flex flex-col'>
                <label htmlFor="">Email</label>
                <p className='p-2 rounded bg-zinc-900 mt-2 font-semibold'>{Profile.email}</p>
              </div>
            </div>
            <div className='mt-4 flex flex-col'>
              <label htmlFor="">Address</label>
              <textarea
                onChange={handleChange}
                name="address"
                placeholder='Address'
                rows="5"
                className='p-2 rounded bg-zinc-800 mt-2 font-semibold'
                value={Value.address} // Corrected to Value.address
              ></textarea>
            </div>
          </div>
          <div className='mt-4 flex justify-end'>
            <button onClick={updateAddress} className='bg-yellow-500 text-zinc-900 font-semibold px-3 py-2 rounded hover:bg-yellow-400'>
              Update
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
