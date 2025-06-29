const express = require("express"); 
const router = express.Router();
const User = require("../models/user");
const Book = require("../models/book");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtsecretkey = "booksstore123";

const {authenticateToken}=require("./userAuth");


router.post("/add-book",authenticateToken,async(req,res)=>{
    try {
        const {user_id}=req.headers;
        const user = await User.findById(user_id);
        if(user.role!="admin"){
            return res.status(400).json({message:"Sorry You do not have access to this section"});

        }
        const book = new Book({
            url:req.body.url,
            title:req.body.title,
            author:req.body.author,
            price:req.body.price,
            desc :req.body.desc,
            language:req.body.language

        });
        await book.save();
        return res.status(201).json({message:"Book added successfully"})

        
    } catch (error) {

        res.status(500).json({message: "Internal server error"});
        
    }
});

router.put("/update-book",authenticateToken,async(req,res)=>{
    const {book_id}= req.headers;
    const {user_id}= req.headers;

    
    const user = await User.findById(user_id);
        if(user.role!="admin"){
            return res.status(400).json({message:"Sorry You do not have access to this section"});

        }
        await Book.findByIdAndUpdate(book_id,{

            url:req.body.url,
            title:req.body.title,
            author:req.body.author,
            price:req.body.price,
            desc :req.body.desc,
            language:req.body.language

        });
        return res.status(200).json({message:"Book updated successfully"});
});

router.get("/get-all-books",async(req,res)=>{
    
    
    const books = await Book.find().sort({createdAt:1});
    return res.status(200).json({message:"success",data:books});
        
    
});

router.get("/get-book-by-id/:id",async(req,res)=>{
    try {
        const{id}=req.params;
        const book = await Book.findById(id);
        return res.status(200).json({message:"Required book retrieved successfully", data:book});
        
    } catch (error) {
        return res.status(500).json({message:"error occurred"});
        
    }
    
});

router.get("/get-recently-added-books",async(req,res)=>{
    
    
    const books = await Book.find().sort({createdAt:-1}).limit(4);
    return res.status(200).json({message:"success",data:books});
        
    
});

router.delete("/delete-book",authenticateToken,async(req,res)=>{
    try {
        const {user_id}= req.headers;
        const user = await User.findById(user_id);
        if(user.role!="admin"){
            return res.status(400).json({message:"Sorry You do not have access to this section"});
        }
        const { book_id } = req.headers;
        await Book.findByIdAndDelete(book_id);
        return res.status(200).json({message: "Book deleted successfully"});
    } catch (error) {
        return res.status(500).json({message:"An error occurred"});
        
    }

});

module.exports = router;