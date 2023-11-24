const express = require('express');
const router = express.Router();
const { createAndUpdateBlog  , getBlogs , deleteBlogByID , getBlogByID , searchBlogs} = require('../controllers/blog.controllers');


// routers for doing CRUD operations on blogs
router.route('/createAndUpdate').post(createAndUpdateBlog);
router.route('/getBlogs').get(getBlogs);
router.route('/deleteBlogByID').post(deleteBlogByID);
router.route('/getBlogByID').get(getBlogByID);
router.route('/searchBlogs').get(searchBlogs);



module.exports = router;