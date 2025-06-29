const express = require("express");
const app = express();
const cors = require("cors");

//importing the values from .env files
require("dotenv").config();
const port = process.env.PORT;

//importing the conn method from conn.js which is used to connect to the mongodb
require("./conn/conn");

//importing api modeules
const user = require("./routes/user");
const Books = require("./routes/book");
const Favourites = require('./routes/favourite');
const cart=require("./routes/cart");
const order = require("./routes/order");


//adding middleware so as to recognize json
app.use(cors());
app.use(express.json());

//routes

app.use("/api/v1",user);
app.use("/api/v1",Books);
app.use("/api/v1",Favourites);
app.use("/api/v1",cart);
app.use("/api/v1",order);

//initiating the server at a port
app.listen(process.env.PORT,()=>{
    console.log("Server is started at "+process.env.PORT);
})