const { ApiResponse } = require('../utils/ApiResponse.utils');
const { ApiError } = require('../utils/ApiError.utils');
const { Blog } = require('../models/blog.models');

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

        return res.status(status).json(new ApiResponse(status, 'Blog saved successfully', result));

    } catch (error) {
        console.log(error);
        return res.status(status).json(new ApiError(status, error.message));
    }
};

const getBlogs = async (req, res) => {
    let status = 200;
    try {
        // limit = 25
        // sort by createdAt
        const blogs = await Blog.find({}).sort({ createdAt: -1 }).limit(25);
        return res.status(status).json(new ApiResponse(status, 'Blogs retrieved successfully', blogs));

    } catch (error) {
        console.log(error);
        return res.status(status).json(new ApiError(status, error.message));
    }
}

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

        return res.status(status).json(new ApiResponse(status, 'Blog deleted successfully', result));

    } catch (error) {
        console.log(error);
        return res.status(status).json(new ApiError(status, error.message));
    }

}


module.exports = {
    createAndUpdateBlog,
    getBlogs,
    deleteBlogByID
};