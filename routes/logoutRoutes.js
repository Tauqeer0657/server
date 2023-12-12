const express = require('express');
const User = require('../models/userModel');
const auth = require('../middleware/auth');

const router = express.Router();

// logout from single device 

router.get('/', auth , async (req,res) => {
    try {
        console.log(req.user);
        
        req.user.tokens = req.user.tokens.filter((currElement) => {
            return currElement.token !== req.token;
        })
        res.clearCookie("jwt");
        console.log("logout successfully");
        await req.user.save();
        res.render("index");
    } catch (error) {
        res.status(500).send(error);
    }});


// logout from all device 

    router.get('/logout', auth , async (req,res) => {
        try {
            console.log(req.user);
    
            req.user.tokens = [];
    
            res.clearCookie("jwt");
            console.log("logout successfully");
            await req.user.save();
            res.render("index");
        } catch (error) {
            res.status(500).send(error);
        }});




module.exports = router;
