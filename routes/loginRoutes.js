const express = require('express');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');

const router = express.Router();

router.post('/', async (req,res) => {
    try {
        const employee_id = req.body.employee_id;
        const password = req.body.password;

        const userId = await User.findOne({employee_id:employee_id});
        const isMatch = await bcrypt.compare(password,userId.password);

        // token generation 

        const token = await userId.generateAuthToken();
        console.log("the token part of login is " + token);

       // save token in cookie 

        res.cookie("jwt",token,{
        expires:new Date(Date.now() + 50000),
        httpOnly:true
    });

        if(isMatch && userId.role === "user"){
            res.status(201).send("You are in user panel");
        }else{
            res.status(400).send("Email or password is incorrect");
        }
    } catch (error) {
        res.status(400).send("Invalid Email");
    }
})

module.exports = router;
