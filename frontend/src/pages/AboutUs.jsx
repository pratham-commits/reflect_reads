import React from 'react';
import { FaBook, FaLeaf, FaUsers } from "react-icons/fa";

const AboutUs = () => {
  return (
    <div className='px-12 py-8 bg-zinc-900 text-zinc-100'>
      <div className='flex flex-col items-center'>
        <h1 className='text-6xl font-sunshiney text-zinc-300 mb-4'>About Reflex Reads</h1>
        <p className='text-xl text-zinc-400 mb-8 text-center max-w-2xl'>
          Welcome to Reflex Reads! We're all about expanding the thrifting culture in books. Our mission is to make reading accessible and sustainable by giving pre-loved books a new home. Join us in our journey to create a community of book lovers who care about the planet.
        </p>
        <div className='flex flex-col md:flex-row gap-8'>
          <div className='bg-zinc-800 rounded p-6 flex flex-col items-center'>
            <FaBook className='text-6xl text-blue-500 mb-4 transition-transform duration-300 hover:scale-110 animate-bounce' />
            <h2 className='text-2xl font-semibold mb-2'>Our Mission</h2>
            <p className='text-center text-zinc-400'>
              At Reflex Reads, we believe in the power of books to change lives. Our goal is to promote the thrifting culture, making books affordable and reducing waste. Let's read, recycle, and repeat!
            </p>
          </div>
          <div className='bg-zinc-800 rounded p-6 flex flex-col items-center'>
            <FaLeaf className='text-6xl text-green-500 mb-4 transition-transform duration-300 hover:scale-110 animate-wind' />
            <h2 className='text-2xl font-semibold mb-2'>Sustainability</h2>
            <p className='text-center text-zinc-400'>
              We're committed to sustainability. By thrifting books, we reduce the demand for new prints, save trees, and lower our carbon footprint. Every book you buy from us is a step towards a greener planet.
            </p>
          </div>
          <div className='bg-zinc-800 rounded p-6 flex flex-col items-center'>
            <FaUsers className='text-6xl text-yellow-500 mb-4 transition-transform duration-300 hover:scale-110 animate-pulse' />
            <h2 className='text-2xl font-semibold mb-2'>Our Community</h2>
            <p className='text-center text-zinc-400'>
              Reflex Reads is more than just a bookstore; it's a community. We bring together book lovers from all walks of life. Connect with fellow readers, share your favorite books, and be part of a movement that values sustainability and knowledge.
            </p>
          </div>
        </div>
        <div className='mt-12 text-center'>
          <h2 className='text-3xl font-semibold text-zinc-300 mb-4'>Meet the Founders</h2>
          <p className='text-xl text-zinc-400'>
            Reflex Reads was founded by Pratham Shah and Astha Parekh, two passionate book lovers who wanted to make a difference. Their vision is to create a sustainable future through the love of reading.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
