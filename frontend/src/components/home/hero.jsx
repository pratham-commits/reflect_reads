import React from 'react'

const hero = () => {
  return (
    <div className='h-[75vh] flex'>
        <div className='w-full lg:w-3/6 flex flex-col items-center lg:items-start justify-center '>
         <h1 className=' text-4xl lg:text-6xl font-semibold text-yellow-100 text-center lg:text-left '>Discover your next great book</h1>
        <p className='mt-8 text-xl text-zinc-300 text-center lg:text-left'>
        From trending tales to classic faves, we've got the lit reads you crave!
        </p>
        <div className='mt-8'>
        <button className='text-yellow-100  text:xl lg:text-2xl font-semibold border border-yellow-100 px-10 py-3 hover:bg-zinc-800 rounded-full'>Discover books</button>
        
        </div>
        </div>
       
    
    <div className='w-full lg:w-3/6 h-auto lg:h-[100%] flex items-center justify-center'>
    <img src="https://i.postimg.cc/pXSHp65L/E2-C3-E359-C873-4-E86-82-AC-73-AD674-E7165-1.png" alt="hero" /></div>
    </div>
  )
}

export default hero