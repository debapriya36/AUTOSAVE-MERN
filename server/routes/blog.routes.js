const express = require('express');
const router = express.Router();
const { createAndUpdateBlog  , getBlogs , deleteBlogByID} = require('../controllers/blog.controllers');


// routers for doing CRUD operations on blogs
router.route('/createAndUpdate').post(createAndUpdateBlog);
router.route('/getBlogs').get(getBlogs);
router.route('/deleteBlogByID').post(deleteBlogByID);
// router.route('/getBlog/:id').get();
// router.route('/updateBlog/:id').put();
// router.route('/deleteBlog/:id').delete();


module.exports = router;