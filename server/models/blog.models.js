const mongoose = require('mongoose');

// blog schema
const blogSchema = new mongoose.Schema(
    {
       text : {
              type : String,
              required : true,
              trim : true
       }
    },
    {
        timestamps: true
    }
);

const Blog = mongoose.model('Blog',blogSchema);
module.exports = { Blog };
