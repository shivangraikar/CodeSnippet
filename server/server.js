// server/server.js

const express = require('express');
const passport = require('passport');
const session = require('express-session');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Snippet = require('./models/Snippet');
const puppeteer = require('puppeteer');
const path = require('path');

const app = express();
const port = 3000; // Or any port you prefer

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// Passport configuration
require('./passport-config');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/code_snippet_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected')).catch(err => console.log(err));


// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
  });
  
  
// Signup
app.post('/signup', async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Login
app.post('/login', passport.authenticate('local', {
  successRedirect: '/dashboard',
  failureRedirect: '/login',
  failureFlash: true
}));

// Logout
app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

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
  try {
    const { id } = req.params;
    const { title, description, language, code } = req.body;
    const snippet = await Snippet.findByIdAndUpdate(id, { title, description, language, code }, { new: true });
    res.json(snippet);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete snippet
app.delete('/snippets/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Snippet.findByIdAndDelete(id);
    res.json({ message: 'Snippet deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Generate PDF from HTML content
app.post('/generate-pdf', async (req, res) => {
  try {
    const { htmlContent } = req.body;
    const pdfBuffer = await generatePDF(htmlContent);
    res.contentType('application/pdf').send(pdfBuffer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Example function to generate PDF from HTML
async function generatePDF(htmlContent) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(htmlContent);
  const pdfBuffer = await page.pdf();
  await browser.close();
  return pdfBuffer;
}

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
