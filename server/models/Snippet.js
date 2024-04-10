// server/models/Snippet.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const snippetSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  language: String,
  code: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, { timestamps: true });

const Snippet = mongoose.model('Snippet', snippetSchema);

module.exports = Snippet;
