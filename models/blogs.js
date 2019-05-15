const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
  title: {type: String, required: true},
  text: {type: String, required: true},
  likes: {type: Number, default: 0},
  tags: [{type: String}]
}, {timestamps: true})

module.exports = mongoose.model('Blog', blogSchema);
