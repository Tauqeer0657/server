// routes/assignmentRoutes.js
const express = require('express');
const Assignment = require('../models/AssignmentModel');

const router = express.Router();

// Route to create a new assignment
router.post('/', async (req, res) => {
  try {
    const assignment = new Assignment(req.body);
    await assignment.save();
    res.status(201).send(assignment);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Route to get all assignments
router.get('/', async (req, res) => {
  try {
    const assignments = await Assignment.find();
    res.send(assignments);
  } catch (error) {
    res.status(500).send(error);
  }
});


router.get('/assignment-codes', async (req, res) => {
  try {
    const codes = await Assignment.find().select('code');
    res.json(codes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



router.get('/latest-assignment-code', async (req, res) => {
  try {
    const latestAssignment = await Assignment.findOne().sort({ code: -1 });

    if (!latestAssignment) {
      return res.status(404).json({ message: 'No assignments found' });
    }

    res.json({ code: latestAssignment.code });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.get('/latest-assignment-employeeid', async (req, res) => {
  try {
    const latestAssignmentemp = await Assignment.findOne().sort({ employee_id: -1 });

    if (!latestAssignmentemp) {
      return res.status(404).json({ message: 'No assignments found' });
    }

    res.json({ employee_id: latestAssignmentemp.employee_id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// get the data of individual assignment

router.get("/:id", async(req,res) => {
  try{
      const _id = req.params.id;
      const assignmentDetails = await Assignment.findById({_id : _id});

      if(!assignmentDetails){
          return res.status(404).send();
      }else{
          res.send(assignmentDetails);
      }
  }catch(e){
      res.send(e);
  }
})

//update the assignment

router.patch("/:id", async(req,res) => {
  try{
    const _id = req.params.id;
    const updateAssignment = await Assignment.findByIdAndUpdate({_id:_id},req.body,{new:true});
    res.send(updateAssignment)
  }catch(error){
    res.status(400).send();
  }
});

//delete assignment

router.delete("/:id", async(req,res) => {
  try{
    const _id = req.params.id;
    const deleteAssignment = await Assignment.findByIdAndDelete({_id:_id});
    res.send(deleteAssignment);
  }catch(error){
    res.status(500).send(error);
  }
})

module.exports = router;
