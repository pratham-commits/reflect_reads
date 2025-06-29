import React, { useState } from "react";
import { Link } from "react-router-dom";
import {FaGripLines} from "react-icons/fa";
import { useSelector } from "react-redux";



function App() {
    const links =[
        {
            title:"Home",
            link:"/",
        },
        {
            title:"About Us",
            link:"/about-us",
        },
        {
            title:"All Books",
            link:"/all-books",
        },
        {
            title:"Cart",
            link:"/cart",
        },
        {
            title:"Profile",
            link:"/profile",
        },
        {
            title:"Admin Profile",
            link:"/profile",
        },
        
    ];

    const isLoggedIn=useSelector((state)=>state.auth.isLoggedIn);
    const role=useSelector((state)=>state.auth.role);
    console.log(isLoggedIn);

    if( isLoggedIn === false){
        links.splice(3,4);
    }
    if(isLoggedIn === true && role==="admin"){
        links.splice(4,1);
    }
    if(isLoggedIn === true && role==="user"){
        links.splice(5,1);
    }
   
  

  return (
    <>
    <nav className="z-50 relative bg-zinc-800 text-white px-8 py-2 flex items-center justify-between">
        <div className ="flex items-center "> 
            <Link to="/">
            <img src="https://i.postimg.cc/zGNPFNrL/book-removebg-preview.png" alt="logo"  className="h-10 me-4" />
            </Link>
            <h1 className="text-2xl font-semibold font-sunshiney">Reflect Reads</h1>
        </div>
        <div className="nav-links-reflectreads block md:flex items-center gap-4 ">
            <div className=" md:flex gap-4">
            {links.map((items,i)=>(
                <Link to={items.link} key={i} className="hover:bg-blue-500 rounded text-zinc-100 hover:text-white transition-all duration-300 border-blue-100 ">{items.title}</Link>
            ))}
            </div>
            
            <div className=" md:flex gap-4">
            {isLoggedIn === false && <>
                <Link to="/login" className="px-4 py-1 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300">Log In</Link>
                <Link to="/sign-up" className="px-4 py-1 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300">Sign Up</Link>
            </>
            }
                
            </div>
            </div>
    </nav>
    
    </>
    
  );
};

export default App
