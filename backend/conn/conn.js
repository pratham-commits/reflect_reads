const mongoose = require("mongoose");
const uri = process.env.URI;


const conn =async()=>{
    try {
        await mongoose.connect(uri);
        console.log("Connected to the database");
        
    } catch (error) {
        console.log(error);
        
    }
};

conn();