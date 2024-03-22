const express = require('express');
const { client } = require('./database');

const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());

// Route to get all users
app.get('/users', (req, res) => {
  client.query('SELECT * FROM books', (err, result) => {
    if (err) {
      console.error('Error fetching users:', err.message);
      return res.status(500).send('Internal Server Error');
    }
    res.json(result.rows);
  });
});

// Route to get user by ID
app.get('/users/:id', (req, res) => {
  console.log(req.params.id)
  client.query(`SELECT * FROM books WHERE id=${req.params.id}`, (err, result) => {
    if (err) {
      console.error('Error fetching user by ID:', err.message);
      return res.status(500).send('Internal Server Error');
    }
    res.json(result.rows);
  });
});



// Route to add a new book
app.post('/users', (req, res) => {
  const { title, author } = req.body;

  // Check if required fields are provided
  if (!title || !author) {
    return res.status(400).send('Title and author are required');
  }

  // Insert the new book using a parameterized query to prevent SQL injection
  const insertQuery = 'INSERT INTO books (title, author) VALUES ($1, $2)';
  const values = [title, author];

  client.query(insertQuery, values, (err, result) => {
    if (err) {
      console.error('Error adding new book:', err.message);
      return res.status(500).send('Internal Server Error');
    }
    res.send('Book added successfully');
  });
});



// to update books by id
app.put('/users/:id', (req, res) => {
  const { title, author } = req.body;
  const bookId = req.params.id;

  // Check if required fields are provided
  if (!title || !author) {
    return res.status(400).send('Title and author are required');
  }

  // Update the book using a parameterized query to prevent SQL injection
  const updateQuery = 'UPDATE books SET title = $1, author = $2 WHERE id = $3';
  const values = [title, author, bookId];

  client.query(updateQuery, values, (err, result) => {
    if (err) {
      console.error('Error updating book:', err.message);
      return res.status(500).send('Internal Server Error');
    }
    res.send('Update was successful');
  });
});

// Route to delete user by ID
app.delete('/users/:id', (req, res) => {
  const deleteQuery = `DELETE FROM books WHERE id=${req.params.id}`;

  client.query(deleteQuery, (err, result) => {
    if (err) {
      console.error('Error deleting user:', err.message);
      return res.status(500).send('Internal Server Error');
    }
    res.send('Deletion was successful');
  });
});

// Start the server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
