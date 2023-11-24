const { ApiResponse } = require('../utils/ApiResponse.utils');
const { ApiError } = require('../utils/ApiError.utils');
const { Blog } = require('../models/blog.models');

// create and update blog
const createAndUpdateBlog = async (req, res) => {
    let status = 201;
    try {

        const { id, draft = "" } = req.body;
        console.log(id, draft);

        if (!id && draft === "") {
            status = 400;
            throw new ApiError(status, 'Please enter a draft');
        }

        let result = {};
        if (id) {

            result = await Blog.findById({
                _id: id
            });

            result.text = draft;
            await result.save();
        } else {
            status = 201;
            result = await Blog.create({ text: draft });
        }
        if(!result){
            status = 404;
            throw new ApiError(status, 'Unable to save blog');
        }

        return res.status(status).json(new ApiResponse(status, 'Blog saved successfully', result));

    } catch (error) {
        console.log(error);
        return res.status(status).json(new ApiError(status, error.message));
    }
};

// get all blogs | limit = 25 | sort by createdAt
const getBlogs = async (req, res) => {
    let status = 200;
    try {
        // limit = 25
        // sort by createdAt
        const blogs = await Blog.find({}).sort({ createdAt: -1 }).limit(25);
        if(!blogs){
            status = 404;
            throw new ApiError(status, 'No blogs found');
        }
        return res.status(status).json(new ApiResponse(status, 'Blogs retrieved successfully', blogs));

    } catch (error) {
        console.log(error);
        return res.status(status).json(new ApiError(status, error.message));
    }
}

// delete blog by id
const deleteBlogByID = async (req, res) => {
    let status = 200;
    try {
        const { id } = req.body;

        if (!id) {
            status = 400;
            throw new ApiError(status, 'Please provide an id');
        }

        const result = await Blog.findByIdAndDelete({
            _id: id
        });

        if(!result){
            status = 404;
            throw new ApiError(status, 'Blog not found');
        }

        return res.status(status).json(new ApiResponse(status, 'Blog deleted successfully', result));

    } catch (error) {
        console.log(error);
        return res.status(status).json(new ApiError(status, error.message));
    }

}

// get blog by id
const getBlogByID = async (req, res) => {
    let status = 200;
    try {
        const { id } = req.body;
        if (!id) {
            status = 400;
            throw new ApiError(status, 'Please provide an id');
        }
        const blog = await Blog.findById({ _id: id });
        if(!blog){
            status = 404;
            throw new ApiError(status, 'Blog not found');
        }
        return res.status(status).json(new ApiResponse(status, 'Blog retrieved by Id successfully', blog));
    } catch (error) {
        console.log(error);
        return res.status(status).json(new ApiError(status, error.message));
    }
}

// search blogs by text | Regex search on text field
const searchBlogs = async (req, res) => {
    let status = 200;
    try {
        const { search } = req.body;
        if (!search) {
            status = 400;
            throw new ApiError(status, 'Please provide a search term');
        }
        // regex search on text field 
        const resultedBlogs = await Blog.find({
            text: {
                $regex: search,
                $options: 'i'
            }
        }).sort({ createdAt: -1 }).limit(25);
        
        if(!resultedBlogs){
            status = 404;
            throw new ApiError(status, 'No blogs found');
        }

        return res.status(status).json(new ApiResponse(status, 'Blogs retrieved by search term successfully', resultedBlogs));


    } catch (error) {
        console.log(error);
        return res.status(status).json(new ApiError(status, error.message));
    }
}


module.exports = {
    createAndUpdateBlog,
    getBlogs,
    deleteBlogByID,
    getBlogByID,
    searchBlogs
};