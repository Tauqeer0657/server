const express = require('express');
const User = require('../models/userModel');
const bcrypt = require('bcrypt')

const router = express.Router();

router.post('/', async (req,res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const userEmail = await User.findOne({email:email});
        const isMatch = await bcrypt.compare(password,userEmail.password);

        if(isMatch){
            res.status(201).send("You are logged in successfully");
        }else{
            res.status(400).send("Email or password is incorrect");
        }
    } catch (error) {
        res.status(400).send("Invalid Email");
    }
})

module.exports = router;
