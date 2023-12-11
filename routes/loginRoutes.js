const express = require('express');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
// const path = require('path');

const router = express.Router();
// const static_path1 = path.join(__dirname, ".../public/admin")

router.post('/', async (req,res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const userEmail = await User.findOne({email:email});
        const isMatch = await bcrypt.compare(password,userEmail.password);

        if(isMatch && userEmail.role === "user"){
            res.status(201).render("index");
            // res.status(201).send("You are in user panel");
        }else{
            res.status(400).send("Email or password is incorrect");
        }
    } catch (error) {
        res.status(400).send("Invalid Email");
    }
})

module.exports = router;
