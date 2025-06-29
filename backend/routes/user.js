const express = require("express"); 
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");
const jwtsecretkey = "booksstore123";

const {authenticateToken}=require("./userAuth");




//sign up funcationality

router.post("/sign-up",async(req,res)=>{
    try {

        const{username,email,password,address}=req.body;

        //check username length>=4
        if(username.length<4){
            return res.status(400).json({message:"The length of the username should be greater than 3"});
        }
       
         //check is it already exists
        const existingusername=await User.findOne({username:username});
        if(existingusername){
        return res.status(400).json({message:"Username already exists"});

            }
        //check if the email already exists
        const existingemail=await User.findOne({email:email});
        if(existingemail){
        return res.status(400).json({message:"Username already exists"});
    
                }

        //check password length
        if(password.length<=5){
        return res.status(400).json({message:"password length should be greater than 5"});
    
                }
        const hashpassword=await bcrypt.hash(password,10);
        const NewUser = new User({username:username,email:email,password:hashpassword,address:address,});
        await NewUser.save();
        res.status(200).json({message:"user created successfully"});

       


        
    } catch (error) {
        res.status(500).json({message:"Internal server error"});
        
    }
});

router.post("/login",async(req,res)=>{
    try {

        const{username,password}=req.body;

        //check if username already exists

        const existinguser = await User.findOne({username});
        if (!existinguser) {

            res.status(400).json({message:"Invalid Credentials"})
            
        }
        //comparing the password
        await bcrypt.compare(password,existinguser.password,(err,data)=>{
            if(data){
                const authClaims=[
                    {name:existinguser.username}, {role:existinguser.role},
                ];
                const token = jwt.sign({authClaims},jwtsecretkey,{expiresIn:"30d",})
                res.status(200).json({
                    id:existinguser._id,
                    role:existinguser.role,
                    token:token,});
            }
            else{
                res.status(500).json({message:"Invalid Credentials"});
            }
        });
    
    } catch (error) {
        res.status(500).json({message:"Internal server error"});
        
    }
});

//get-user information

router.get("/get-user-information",authenticateToken, async(req,res)=>{

    try{
        const {user_id}=req.headers;
        const data = await User.findById(user_id).select("-password");
        return res.status(200).json(data);


    }
    catch(error){
        res.status(500).json({message:"Internal server error"});
    }

});


//update address
router.put("/update-address",authenticateToken,async(req,res)=>{
    try {
        const {user_id}=req.headers;
        const {address}=req.body;
        await User.findByIdAndUpdate(user_id,{address:address});
        return res.status(200).json({message:"Address changed successfully"});
        
    } catch (error) {
        return res.status(500).json({message:"Internal Server Error"});
        
    }
});


module.exports = router;




