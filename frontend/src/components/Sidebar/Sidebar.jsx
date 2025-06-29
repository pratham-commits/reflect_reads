import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaSignOutAlt } from 'react-icons/fa';
import {useSelector,useDispatch} from "react-redux";
import {authActions} from "../../store/auth"





const Sidebar = ({data}) => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const role=useSelector((state)=>state.auth.role);
  return (
    <div className='bg-zinc-800 h-[80vh] mt-5 mb-5 p-4 rounded flex flex-col items-center justify-between '>
        <div className='flex items-center flex-col justify-center'>
        <img src={data.avatar} className='h-[12vh] ' alt="" />
        <p className='mt-3 text-xl font-semibold text-zinc-100'>{data.username}</p>
        <p className='mt-1 text-normal text-zinc-100'>{data.email}</p>
        <div className='w-full mt-4  h-[1px] bg-zinc-500 hidden lg:block '>
        </div>   
        </div>

        {role === "user" && (<div className='w-full flex-col items-center justify-center hidden lg:flex'>
        <Link to = "/profile" className='mt-5 text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300'> Favourites</Link>
        <Link to = "/profile/orderHistory" className='mt-5 text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300'> Order History</Link>
        <Link to = "/profile/Settings" className='mt-5 mb-5text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300'> Settings</Link>
        </div>)}

        {role ==="admin" && (<div className='w-full flex-col items-center justify-center hidden lg:flex'>
        <Link to = "/profile" className='mt-5 text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300'> All Orders</Link>
        <Link to = "/profile/add-books" className='mt-5 text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300'> Add Books</Link>
        </div>)}
        <button onClick ={()=>{
          dispatch(authActions.logout());
          dispatch(authActions.changeRole("user"));
          localStorage.clear("id");
          localStorage.clear("token");
          localStorage.clear("role");
          history("/");
        }}className='bg-zinc-400 w-4/6 text-white font-semibold flex  items-center justify-center py-2 rounded hover:bg-white hover:text-zinc-900 transtition-all duration-300'>
        
            <div className='m-0.5' >
            LogOut 
            </div>
            <div className='m-0.5'><FaSignOutAlt className="ms-4" /></div>

            
            
            


        </button>
        

        
    </div>
  )
}

export default Sidebar