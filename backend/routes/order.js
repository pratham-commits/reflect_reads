const express = require("express"); 
const router = express.Router();
const User = require("../models/user");
const Order = require("../models/order"); // Ensure correct model import
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtsecretkey = "booksstore123";
const { authenticateToken } = require("./userAuth");

// Placing the order
router.post("/place-order", authenticateToken, async (req, res) => {
    try {
        const { user_id } = req.headers;
        const { order } = req.body;
        for (const orderdata of order) {
            const neworder = new Order({ user: user_id, book: orderdata._id });
            const orderdatafromdb = await neworder.save();

            // Saving order in user model
            await User.findByIdAndUpdate(user_id, {
                $push: { orders: orderdatafromdb._id },
            });

            // Clearing the cart
            await User.findByIdAndUpdate(user_id, {
                $pull: { cart: orderdata._id },
            });
        }
        return res.status(200).json({ status: "Success", message: "Order placed successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
});

// Get order history for a particular user
router.get("/get-user-history-for-users", authenticateToken, async (req, res) => {
    try {
        const { user_id } = req.headers;
        const userdata = await User.findById(user_id).populate({ path: "orders", populate: { path: "book" } }); // Ensure correct path
        const orderdata = userdata.orders.reverse();
        return res.status(200).json({ status: "Success", data: orderdata });
    } catch (error) {
        console.error("Error fetching user order history:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

// Get complete order history for the website for admin
router.get("/complete-order-history", authenticateToken, async (req, res) => {
    try {
        const { user_id } = req.headers;
        const user = await User.findById(user_id);
        if (user.role !== "admin") {
            return res.status(400).json({ message: "You do not have access to this section" });
        }
        const userdata = await Order.find().populate({ path: "book" }).populate({ path: "user" }).sort({ createdAt: -1 });
        return res.status(200).json({ status: "Success", message: userdata });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

// Updating the order status for the admin roles
router.put("/update-status/:order_id", authenticateToken, async (req, res) => {
    try {
        const { user_id } = req.headers;
        const user = await User.findById(user_id);
        if (user.role !== "admin") {
            return res.status(400).json({ message: "You do not have access to this section" });
        }
        const { order_id } = req.params;
        await Order.findByIdAndUpdate(order_id, { status: req.body.status });
        return res.status(200).json({ status: "Success", message: "Order updated successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
