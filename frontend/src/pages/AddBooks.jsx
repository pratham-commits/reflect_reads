import React from 'react';
import axios from 'axios';
import { useState } from 'react';

const AddBooks = () => {
    const [Data, setData] = useState({
        url:"",title:"",author:"",price:"",desc:"",language:"",
    });
    const headers = {
        user_id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
      };

    const change = (e)=>{
        const {name,value} = e.target;
        setData({...Data, [name]:value});
    };
    const submit = async () => {
        try {
            if (Data.url ==="" || Data.author==="" || Data.desc==="" || Data.language===""|| Data.price===""|| Data.title==="") {
                alert("Please fill in all fields.");
            }
            const response= await axios.post('http://localhost:1000/api/v1/add-book',Data,{headers});
            setData({url:"",title:"",author:"",price:"",desc:"",language:""});
            alert(response.data.message);
        } catch (error) {
            alert(error.response.data.message);
        }
    };

    return (
        <div className='ml-8 h-[80vh] p-0 flex flex-col'>
            <div className='p-4 flex items-center justify-center'><h1 className='mt-8 text-3xl font-semibold text-zinc-500 mb-8'>Add Book</h1></div>
            
            <div className='flex-1 overflow-auto'>
                <div className='p-4 bg-zinc-800 rounded mb-4'>
                    <div>
                        <label htmlFor="url" className='text-zinc-400'>Image</label>
                        <input value={Data.url} onChange={change} type="text" name="url" id="url" placeholder='url of image' className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'/>
                    </div>
                </div>

                <div className='p-4 bg-zinc-800 rounded mb-4'>
                    <div>
                        <label htmlFor="title" className='text-zinc-400'>Title</label>
                        <input value={Data.title} onChange={change} type="text" name="title" id="title" placeholder='Title' className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'/>
                    </div>
                </div>

                <div className='p-4 bg-zinc-800 rounded mb-4'>
                    <div>
                        <label htmlFor="author" className='text-zinc-400'>Author</label>
                        <input value={Data.author} onChange={change} type="text" name="author" id="author" placeholder='Author of the Book' className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'/>
                    </div>
                </div>

                <div className='p-4 bg-zinc-800 rounded mb-4'>
                    <div>
                        <label htmlFor="desc" className='text-zinc-400'>Description</label>
                        <textarea value={Data.desc} onChange={change} name="desc" rows="5" id="desc" placeholder='Description' className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'></textarea>
                    </div>
                </div>

                <div className='p-4 bg-zinc-800 rounded mb-4'>
                    <div>
                        <label htmlFor="price" className='text-zinc-400'>Price</label>
                        <input value={Data.price} onChange={change} type="number" name="price" id="price" placeholder='Price' className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'/>
                    </div>
                </div>

                <div className='p-4 bg-zinc-800 rounded mb-4'>
                    <div>
                        <label htmlFor="language" className='text-zinc-400'>Language</label>
                        <input value={Data.language} onChange={change} type="text" name="language" id="language" placeholder='Language' className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'/>
                    </div>
                </div>
                <div className='flex justify-center items-center w-full'>
                    <button onClick={submit} className='bg-blue-500 mt-4 px-3 text-white font-semibold py-2 rounded hover:text-blue-500 hover:bg-white'>Add Book</button>
                </div>
            </div>
        </div>
    );
}

export default AddBooks;
