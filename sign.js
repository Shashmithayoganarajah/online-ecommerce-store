const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;

// Middleware to parse incoming request bodies
app.use(express.urlencoded({ extended: true }));

// Create a MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'sign'
});

// Connect to the MySQL database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database: ' + err.stack);
    return;
  }
  console.log('Connected to the database.');
});

// Serve the login page
app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/login.html');
});

// Handle login form submission
app.post('/login', (req, res) => {
    const { userid, password } = req.body;
  
    // Check username and password against the database
    connection.query('SELECT * FROM users WHERE userid = ?', [userid], (err, results) => {
      if (err) {
        console.error('Error querying the database:', err);
        return res.status(500).send('An unexpected error occurred');
      }
  
      if (results.length === 0 || results[0].password !== password) {
        console.log('Login failed. Userid or password is incorrect.');
        return res.status(401).send('Login failed');
      }
  
      console.log('Login successful');
      // Redirect to index.html upon successful login
      res.redirect('/food.html');
    });
  });

// Serve the sign-up page
app.get('/signup', (req, res) => {
  res.sendFile(__dirname + '/signup.html');
});

// Handle sign-up form submission
app.post('/signup', (req, res) => {
  const { name, userid, phone, password, repassword } = req.body;

  // Check if passwords match
  if (password !== repassword) {
    return res.status(400).send('<script>alert("Password does not match"); window.location="/signup.html";</script>');
  }

  // Insert user data into the database
  const userData = { name, userid, phone, password };
  connection.query('INSERT INTO users SET ?', userData, (err, results) => {
    if (err) {
      console.error('Error inserting data into users table: ' + err.stack);
      return res.status(500).send('Error signing up');
    }
    console.log('Data inserted into users table successfully.');
    res.redirect('/login');
  });
});

// Serve static files from the current directory
app.use(express.static(__dirname));

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
