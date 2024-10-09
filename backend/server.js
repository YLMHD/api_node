const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv').config();

const port = process.env.PORT || 5000;

connectDB();



const app = express();

// middlewares to parse the request body as JSON
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// Define the route for the root URL of the site
app.use("/", require("./routes/routes"));
    
// Listen for requests
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 