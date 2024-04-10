// server/server.js

const express = require('express');
const passport = require('passport');
const session = require('express-session');
const Snippet = require('./models/Snippet'); // Import Snippet model
const app = express();
const port = 3000; // Or any port you prefer

// Middleware
// ...

// Routes
// ...

// Create snippet
app.post('/snippets', async (req, res) => {
  try {
    const { title, description, language, code } = req.body;
    const snippet = new Snippet({ title, description, language, code, user: req.user._id });
    await snippet.save();
    res.status(201).json(snippet);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all snippets
app.get('/snippets', async (req, res) => {
  try {
    const snippets = await Snippet.find({ user: req.user._id });
    res.json(snippets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update snippet
app.patch('/snippets/:id', async (req, res) => {
  // Implementation similar to create route
});

// Delete snippet
app.delete('/snippets/:id', async (req, res) => {
  // Implementation similar to create route
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
