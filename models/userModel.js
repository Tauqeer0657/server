// models/userModel.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
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
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  }
});

userSchema.pre("save", async function(next) {
  if(this.isModified("password")){
      this.password = await bcrypt.hash(this.password, 10);
      this.confirm_password = await bcrypt.hash(this.confirm_password, 10);
  }
  next();
})


const User = mongoose.model('Registration', userSchema);

// const counterSchema = new mongoose.Schema({
//     id : {
//         type : String
//     },
//     seq : {
//         type : Number
//     }
// });

// const Counter = mongoose.model('Counter', counterSchema);

module.exports = User;
// module.exports = Counter;