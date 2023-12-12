// index.js
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');  // Import the cors middleware
const connectDB = require('./config/db');
const assignmentRoutes = require('./routes/assignmentRoutes');
const registrationRoutes = require('./routes/registrationRoutes');
const loginRoutes = require('./routes/loginRoutes');
const logoutRoutes = require('./routes/logoutRoutes');
const cookieParser = require('cookie-parser');

// Connect to the database
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

app.use(cookieParser());

app.use(cors());

// Assign the assignment routes
app.use('/assignments', assignmentRoutes);

// Assign the registration routes
app.use('/registration', registrationRoutes);

// Assign the login routes
app.use('/login', loginRoutes);

// Assign the login routes
app.use('/logout', logoutRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
