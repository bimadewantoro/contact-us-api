const express = require('express');
const bodyParser = require('body-parser');
const contactUsRoutes = require('./routes/contactUs.route');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = 3000; // Change this to your desired port number

// Middleware setup
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Home route
app.get('/', (req, res) => {
    res.send('Server is running');
});

// Routes
app.use('/api', contactUsRoutes);

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});