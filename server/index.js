require('dotenv').config();

const express = require('express');
const app = express();
const PORT = 3000 || process.env.PORT;
const cors = require('cors');
const { connectToDB } = require('./config/db.config.js');

// connect to db
connectToDB();

// middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// routes
app.use('/api/v1', require('./routes/blog.routes'));


// server listening 
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
