const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;

// Middleware to parse incoming request bodies
app.use(express.urlencoded({ extended: true }));

// Create a MySQL connection pool (improved for handling multiple connections)
const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'sign'
});

// Serve the login page
app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/Loginh.html');
  });
  
  app.post('/login', (req, res) => {
    const { gmail, password } = req.body;
  
    // Get a connection from the pool
    pool.getConnection((err, connection) => {
      if (err) {
        console.error('Error getting connection from pool:', err);
        return res.status(500).send('Error connecting to database');
      }
  
      // Check username and password against the database
      connection.query('SELECT * FROM hotal WHERE gmail = ? AND password = ?', [gmail, password], (err, results) => {
        connection.release(); // Release the connection back to the pool
  
        if (err) {
          console.error('Error querying the database:', err);
          return res.status(500).send('An unexpected error occurred');
        }
  
        if (results.length === 0) {
          console.log('Login failed. Email or password is incorrect.');
          return res.status(401).send('Login failed');
        }
  
        console.log('Login successful');

        // Get the logged-in user's information
        const loggedInUser = results[0];

        // Redirect to food.html and pass user information as query parameters
        res.redirect(`/foood.html?name=${loggedInUser.name}&hotalname=${loggedInUser.hotalname}&gmail=${loggedInUser.gmail}`);
      });
    });
});

// Serve the sign-up page
app.get('/signup', (req, res) => {
  res.sendFile(__dirname + '/hotalsign.html');
});

// Handle sign-up form submission
app.post('/signup', (req, res) => {
  const { name, hotalname, address, phone, upi, gmail, password, repassword } = req.body;

  // Check if passwords match
  if (password !== repassword) {
    return res.status(400).send('<script>alert("Password does not match"); window.location="/signup.html";</script>');
  }

  // Get a connection from the pool
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error getting connection from pool:', err);
      return res.status(500).send('Error connecting to database');
    }

    // Insert user data into the database
    const userData = { name, hotalname, address, phone, 'upi id': upi, gmail, password };
    connection.query('INSERT INTO hotal SET ?', userData, (err, results) => {
      connection.release(); // Release the connection back to the pool

      if (err) {
        console.error('Error inserting data into hotal table:', err);
        return res.status(500).send('Error signing up');
      }
      console.log('Data inserted into hotal table successfully.');
      res.redirect('/login');
    });
  });
});

// Serve static files from the current directory
app.use(express.static(__dirname));

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
