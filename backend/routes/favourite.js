const express = require("express"); 
const router = express.Router();
const User = require("../models/user");
const Book = require("../models/book");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtsecretkey = "booksstore123";

const {authenticateToken}=require("./userAuth");

// add book to favourites

router.put("/add-book-to-favourite",authenticateToken,async (req,res)=>{
    try {
        const{book_id}=req.headers;
        const{user_id}=req.headers;
        const userdata = await User.findById(user_id);

        const isbookfavourite = userdata.favourites.includes(book_id);

        if(isbookfavourite){
            return res.status(200).json({message:"Book is already in favourites"});
        }
        await User.findByIdAndUpdate(user_id,{$push:{favourites:book_id}});
        return res.status(200).json({message:"Book has been added successfully to favourites"})
        
        
    } catch (error) {
        res.status(500).json({message:"Internal Server Error"});
        
    }
    
});

// delete book from favourites

router.delete("/delete-from-favourites",authenticateToken,async (req,res)=>{
    try {
        const {book_id}=req.headers;
        const {user_id}=req.headers;
        const userdata = await User.findById(user_id);
        const isbookfavourite= userdata.favourites.includes(book_id);
        if(isbookfavourite){
            await User.findByIdAndUpdate(user_id,{$pull:{favourites:book_id}});
            return res.status(200).json({message:"Book removed from favourites"});

        }
        return res.status(200).json({message:"Book is not present in favourites"});

        
    } 
    catch (error) {
        return res.status(500).json({message:"Internal Server Error"});
        
    }
});

//get all books in favourites

router.get("/get-fav-books",authenticateToken,async (req,res)=>{
    try {
        const {user_id}=req.headers;
        const userdata = await User.findById(user_id).populate("favourites");
        const favbooks = userdata.favourites.reverse();
        return res.status(200).json({message:"success",data:favbooks});
    } catch (error) {
        return res.status(500).json({message:"Internal server error"});
        
    }
});

module.exports=router;