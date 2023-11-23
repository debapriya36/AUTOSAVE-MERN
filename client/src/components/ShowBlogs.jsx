import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
const BASE_URL = 'http://localhost:3000';

const ShowBlogs = () => {
  const [blogs, setBlogs] = useState(()=>[]);

  const fetchedBlogs = async() => {
    const response = await axios.get(`${BASE_URL}/api/v1/getBlogs`);
    console.log(response.data.data);
    setBlogs(response.data.data);
  }

  useEffect(()=> {
    fetchedBlogs();
  },[blogs]);


  return (
    <div>
        <h2> All Saved Blogs </h2>
        {
          blogs.map((blog) => {
          return (
            <div key={blog._id}>
              <h3
              style={
                {
                 color: "darkblue",
                }
              }
              > {blog.text} </h3>
            </div>
          )
        })
        }
    </div>
  )
}

export default ShowBlogs
