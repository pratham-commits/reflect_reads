import React, { Profiler, useEffect } from 'react';
import './App.css';
import Home from './pages/home';
import Navbar from "./components/navbar/navbar";
import Footer from "./components/footer/footer";
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import AllBooks from './pages/AllBooks';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import AboutUs from './pages/AboutUs';
import Profile from './pages/profile';
import Cart from './pages/Cart';
import RecentlyAddedBooks from './components/home/RecentlyAddedBooks';
import ViewBookDetails from './components/ViewBookDetails/ViewBookDetails';

import { useDispatch, useSelector } from 'react-redux';
import { authActions } from './store/auth';
import Fav from './components/Sidebar/Fav';
import Userorderhistory from './components/Sidebar/Userorderhistory';
import Settings from './components/Sidebar/Settings';
import Allorders from './pages/Allorders';
import AddBooks from './pages/AddBooks';
import UpdateBook from './pages/UpdateBook';





function App() {
  

  const dispatch = useDispatch();
  const role = useSelector((state)=>state.auth.role);
  useEffect(() => {

    if(localStorage.getItem("id") && localStorage.getItem("token") && localStorage.getItem("role")){
      dispatch(authActions.login());
      dispatch(authActions.changeRole(localStorage.getItem("role")));
    }
  }, [])
  

  return (
    <div>
     
      <Navbar />
      <Routes>
        <Route exact path='/' element={<Home />}></Route>
        <Route exact path='/all-books' element={<AllBooks />}></Route>
        <Route exact path='/login' element={<Login />}></Route>
        <Route exact path='/sign-up' element={<SignUp />}></Route>
        <Route exact path='/about-us' element={<AboutUs />}></Route>
        <Route path='/profile' element={ <Profile />}>
        
        {role ==="user" ?(<Route index element={<Fav />}/>):(<Route index element={<Allorders />}/>)}
        {role === "admin" && (<Route path='/profile/add-books' element={<AddBooks />}></Route>)}
        
        <Route path='/profile/orderHistory' element={<Userorderhistory />}/>
        <Route path='/profile/Settings' element={<Settings />}/>
        </Route>
        <Route path='/update-book/:id' element={<UpdateBook />}></Route>
        <Route exact path='/cart' element={ <Cart />}></Route>
        <Route exact path='/view-book-details/:id' element={<ViewBookDetails />}></Route>
        
      </Routes>
      
      <Footer />
      

      
      
      
      
    </div>
    
  );
};

export default App
