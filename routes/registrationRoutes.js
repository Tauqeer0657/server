// routes/registrationRoutes.js
const express = require('express');
const User = require('../models/userModel');
// const Counter = require('../models/registrationModel');

const router = express.Router();

// Route to create a new registration
router.post('/', async (req, res) => {

  // Counter.findOneAndUpdate(
  //   {id:"autoval"},
  //   {"$inc" : {"seq" : 1}},
  //   {new:true},(err,cd) => {
  //     let seqId;
  //     if(cd==null){
  //       const newval = new Counter(
  //         {id:"autoval",seq:1}
  //       )
  //       newval.save()
  //       seqId = 1
  //     }else{
  //       seqId=cd.seq
  //     }

      try {
        const password = req.body.password;
        const confirm_password = req.body.confirm_password;

      if(password === confirm_password){
        const registration = new User(req.body);

      // Calling for generate token 

      const token = await registration.generateAuthToken();
      console.log("the token part is " + token);
        await registration.save();
        res.status(201).send("Successfully Registered");
      }else{
        res.status(404).send("password is not matched")
      }
    }catch (error) {
      res.status(400).send(error);
    }
  }
  )


// Route to get all registrations
router.get('/', async (req, res) => {
  try {
    const registration = await User.find();
    res.send(registration);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;