const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Customer = require("../models/customer");

const router = express.Router();
const SECRET_KEY = process.env.ACCESS_TOKEN_KEY;

// customer Login
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const customer = await Customer.findOne({ email });
        if (!customer) return res.status(404).json({ message: "Customer not found" });

        const isPasswordMatch = await bcrypt.compare(password, customer.password);
        if (!isPasswordMatch) return res.status(401).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: customer._id }, SECRET_KEY, { expiresIn: "5h" });
        res.json({ token, auth:true, message:'You are successfully signed in' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// customer signup
router.post("/signup", async (req, res) => {
    const { fullName, email, password } = req.body;

    try {
        const existingCustomer = await Customer.findOne({ email });
        if (existingCustomer) return res.status(400).json({ message: "Customer already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);

        const newCustomer = new Customer({
            fullName,
            email,
            password: hashedPassword,
        });

        await newCustomer.save();
        res.status(201).json({ message: "Customer registered successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
