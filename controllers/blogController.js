const express = require('express')
const router = express.Router()

const Blog = require('../models/blogs.js')

// INDEX
router.get('/', (req, res) => {
    Blog.find( {}, (err, foundBlogs) => {
        res.json(foundBlogs) 
    });
});

// CREATE
router.post('/', (req, res) => {
    Blog.create( req.body, (err, createdBlog) => { 
        res.json(createdBlog);
    });
});

// DELETE
router.delete('/:id', (req, res) => {
    Blog.findByIdAndRemove(req.params.id, (err, deletedBlog) => { 
        res.json(deletedBlog);
    });
});

// EDIT
router.put('/:id', (req, res) => {
    Blog.findByIdAndUpdate( req.params.id, req.body, {new:true}, (err, updatedBlog) => { 
        res.json(updatedBlog);
    });
});

module.exports = router