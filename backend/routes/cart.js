const express = require("express"); 
const router = express.Router();
const User = require("../models/user");
const Book = require("../models/book");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtsecretkey = "booksstore123";

const {authenticateToken}=require("./userAuth");

//add books to cart
router.put("/add-to-cart",authenticateToken,async (req,res)=>{
    try {
        const{user_id}=req.headers;
        const{book_id}=req.headers;
       
        await User.findByIdAndUpdate(user_id,{$push:{cart:book_id}});
        return res.status(200).json({message:"Item added to cart successfully"});
        
    } catch (error) {
        return res.status(500).json({message:"Internal Server error"});
        
    }
});


//show the whole cart
router.get("/show-cart",authenticateToken,async (req,res)=>{
    try {
        const {user_id}= req.headers;
        const userdata = await User.findById(user_id).populate("cart");
        const cart= userdata.cart.reverse();
        return res.status(200).json({message:"Success!",data:cart});
        
    } catch (error) {
        return res.status(500).json({message:"Internal Server Error"});
        
    }
});

//delete an item in the cart
router.delete("/delete-from-cart/:book_id",authenticateToken,async (req,res)=>{
    try {
        const {book_id}=req.params;
        const {user_id}=req.headers;
        const userdata = await User.findById(user_id);
        const isbookincart= userdata.cart.includes(book_id);
        if(isbookincart){
            await User.findByIdAndUpdate(user_id,{$pull:{cart:book_id}});
            return res.status(200).json({message:"Book removed from cart"});

        }
        return res.status(200).json({message:"Book is not present in cart"});
        
    } catch (error) {
        return res.status(500).json({message:"Internal Server error"+error});
        
    }
});

module.exports = router;
