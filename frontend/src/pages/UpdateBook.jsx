import React from 'react';
import axios from 'axios';
import { useState,useEffect } from 'react';
import { useNavigate,useParams } from 'react-router-dom';

const UpdateBook = () => {
    const {id}=useParams();
    const navigate = useNavigate();
    
  
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
            const headers = {
                user_id: localStorage.getItem("id"),
                authorization: `Bearer ${localStorage.getItem("token")}`,
                book_id: id.startsWith(':') ? id.slice(1) : id, // Clean the id here as well
            };
            if (Data.url === "" || Data.author === "" || Data.desc === "" || Data.language === "" || Data.price === "" || Data.title === "") {
                alert("Please fill in all fields.");
                return; // Add this line to prevent further execution
            }
            const response = await axios.put('http://localhost:1000/api/v1/update-book', Data, { headers });
            setData({ url: "", title: "", author: "", price: "", desc: "", language: "" });
            alert(response.data.message);
            navigate("/all-books");
        } catch (error) {
            alert(error.response.data.message);
        }
    };
    

    useEffect(() => {
        const fetch = async () => {
            const cleanId = id.startsWith(':') ? id.slice(1) : id;
            console.log(cleanId); // This should print the id without the colon
    
            try {
                const response = await axios.get(`http://localhost:1000/api/v1/get-book-by-id/${cleanId}`);
                setData(response.data.data);
                
            } catch (error) {
                console.error("Error fetching book data:", error);
            }
        };
        fetch();
    }, [id]);
    


    return (
        <div className=' h-[80vh] p-0 flex flex-col bg-zinc-900'>
            <div className='flex items-center justify-center'><h1 className='text-3xl font-semibold text-yellow-100 mb-8'>Update Book</h1></div>
            
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
                    <button onClick={submit} className='bg-blue-500 mt-4 mb-4  px-3 text-white font-semibold py-2 rounded hover:text-blue-500 hover:bg-white'>Update Book</button>
                </div>
            </div>
        </div>
    );
}

export default UpdateBook