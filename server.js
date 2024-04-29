const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/ecommerce', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.error("Error connecting to MongoDB:", err);
});

// Define user schema
const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    mobileNo: String,
    password: String
});

// Define user model
const User = mongoose.model('User', userSchema);

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Route to serve the signin.html page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'signin.html'));
});

// Route to handle form submission
app.post('/signin', (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        mobileNo: req.body.mobileNo,
        password: req.body.password
    });

    newUser.save((err) => {
        if (err) {
            console.error("Error saving user:", err);
            res.status(500).send('Error saving user');
        } else {
            console.log("User saved successfully");
            res.send('Sign-in successful!');
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
