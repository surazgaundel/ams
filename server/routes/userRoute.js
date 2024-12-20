const express = require('express');
const router = express.Router();
const User = require('../models/user');


//get user
router.get('/', async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    try {
        const users = await User.find()
        .limit(limit * 1)
        .skip((page - 1) * limit);
        const totalUser = await User.countDocuments();
        res.status(201).json({ 
            users, 
            totalUser, 
            page, 
            totalPages: Math.ceil(totalUser / limit) 
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


//create user
router.post('/', async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json({message:'New User Added Successfully'});
    } catch (err) {
        res.status(500).json({ message: err.message });
    } 
});

// update user
router.put('/:id', async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(201).json({message:'User Updated Successfully'});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//delete user
router.delete('/:id', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(201).json({ message: 'User deleted successfully.' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;