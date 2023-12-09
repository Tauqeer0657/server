// models/registrationModel.js
const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
  employee_id : {
    type : String,
    unique : true,
    required : true
  },
  first_name: {
    type : String,
    required : true
  },
  last_name: {
    type : String,
    required : true
  },
  position: {
    type : String,
    required : true
  },
  email: {
    type : String,
    required : true
  },
  phone_number: {
    type : Number,
    required : true
  },
  address: {
    type : String,
    required : true
  },
  city: {
    type : String,
    required : true
  },
  state: {
    type : String,
    required : true
  },
  password: {
    type : String,
    required : true
  },
  confirm_password: {
    type : String,
    required : true
  }
});

const Registration = mongoose.model('Registration', registrationSchema);

// const counterSchema = new mongoose.Schema({
//     id : {
//         type : String
//     },
//     seq : {
//         type : Number
//     }
// });

// const Counter = mongoose.model('Counter', counterSchema);

module.exports = Registration;
// module.exports = Counter;