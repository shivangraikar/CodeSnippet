// server/server.js

const express = require('express');
const passport = require('passport');
const session = require('express-session');
const app = express();
const port = 3000; // Or any port you prefer

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/code_snippet_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}).then(() => console.log('MongoDB connected')).catch(err => console.log(err));


require('./passport-config'); // Import passport configuration

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

// Routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});