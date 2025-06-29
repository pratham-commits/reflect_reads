import React, { useEffect,useState} from 'react';
import axios from 'axios';
import Loader from '../components/Loader/Loader'
import { FaCheck, FaUserLarge } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import SeeUserData from './SeeUserData';
const Allorders = () => {
  const [AllOrders, setAllOrders] = useState();
  const [Options, setOptions] = useState(-1);
  const [userDiv, setuserDiv] = useState("hidden");
  const [userDivData, setuserDivData] = useState();
  const [Values, setValues] = useState({status:""})
  
  const headers = {
    authorization: `Bearer ${localStorage.getItem("token")}`,
    user_id: localStorage.getItem("id"),
  };
  
  

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get("http://localhost:1000/api/v1/complete-order-history", { headers });
        setAllOrders(response.data.message);
      } catch (error) {
        console.error("Error fetching order history:", error);
      }
    };
    fetch();
  }, [AllOrders]);

  const setOptionsButton =(i)=>{
    setOptions(i);
  };
  const change = (e)=>{
    const {value} = e.target;
    setValues({status:value});
  }

  const submitChanges = async(i)=>{
    const id = AllOrders[i]._id;
    const response = await axios.put(`http://localhost:1000/api/v1/update-status/${id}`,Values,{headers});
    alert(response.data.message);
  }

  return (
    <>
    {!AllOrders && <div className='h-[100%] flex items-center justify-center'><Loader /></div>}

    {AllOrders && AllOrders.length>0 && (<>
      
      <div className='h-[100%] p-0 text-zinc-100'>
        <h1 className='text-3xl font:semibold text-zinc-500 mb-8'>
          Complete Order History
        </h1>
        <div className='mt-4 bg-zinc-800 w-full rounded py-2 px-4 flex gap-2'>
          <div className='w-[3%]'>
            <h1 className='text-center'>Sr.</h1>
          </div>
          <div className='w-[22%]'>
            <h1 className='text-center'>Books</h1>
          </div>
          <div className='w-[26%]'>
            <h1 className='text-center'>Description</h1>
          </div>
          <div className='w-[9%]'>
            <h1 className='text-center'>Price</h1>
          </div>
          <div className='w-[30%]'>
            <h1 className='text-center'>Status</h1>
          </div>
          <div className='ml-2 mt-1 w-[10%]'>
            <h1 className=''><FaUserLarge /></h1>
          </div>
        </div>
        {AllOrders.map((items,i)=>(
          
        <div className='mt-4 bg-zinc-800 w-full rounded py-2 px-4 flex gap-2 hover:bg-zinc-900'>
        <div className='w-[3%]'>
          <h1 className='text-center'>{i+1}</h1>
        </div>
        <div className='w-[22%]'>
          <h1 className='text-center'>
            <Link className="hover:text-blue-300" to ={`/get-book-by-id/${items.book._id}` }>{items.book.title}</Link>
          </h1>
        </div>
        <div className='w-[26%]'>
          <h1 className=''>{items.book.desc.slice(0,50)} ...</h1>
        </div>
        <div className='w-[9%]'>
          <h1 className='text-center'>₹ {items.book.price}
          </h1>
        </div>
        <div className='w-[30%] flex justify-center items-center'> <h1 className='font-semibold'><button onClick={()=>setOptionsButton(i)} className='hover:scale-102 transition-all duration-300'>
          {items.status==="Order Placed" ? (<div className='text-yellow-500'>{items.status}</div>):items.status === "Cancelled" ?(<div className='text-red-500'>{items.status}</div>):(<div className='text-green-500'>{items.status}</div>)}
          </button>
          {Options === i && <div className={`${Options === i ? "flex" :"block"}`}> 
            <select name="status" onChange={change} value={Values.status} id="" className='bg-gray-800'>
              {["Order Placed","Out for Delivery", "Delivered","Cancelled"].map((items,i)=>(
                <option value={items} key={i}>{items}</option>
              ))}
            </select>
            <button onClick={()=>{setOptions(-1); submitChanges(i);}} className='text-green-500 hover:text-pink-600 mx-2'><FaCheck /></button>
          </div>}
          </h1></div>
        <div className=' w-[10%] flex items-center'>
          <button onClick={()=>{
            setuserDiv("fixed");
            setuserDivData(items.user);
          }} className='text-center hover:text-orange-500 text-xl'><FaArrowUpRightFromSquare /></button>
        </div>
      </div>
          

        ))}
      </div>
    
    </>)}
    {userDivData && (<SeeUserData userDivData={userDivData} userDiv={userDiv} setuserDiv={setuserDiv}/>)}
    </>
  );
};

export default Allorders;
