import React from "react";
import Hero from "../components/home/hero";
import RecentlyAddedBooks from "../components/home/RecentlyAddedBooks";


function App() {
  

  return (
    <div className="bg-zinc-900 text-white px-10 py-8"> 
        <Hero />
        <RecentlyAddedBooks />
    </div>
  );
};

export default App
