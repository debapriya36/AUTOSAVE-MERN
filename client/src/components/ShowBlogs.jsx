import React, { useState, useEffect } from 'react'

import axios from 'axios'
const BASE_URL = 'http://localhost:3000'

// ShowBlogs component
const ShowBlogs = () => {
  const [blogs, setBlogs] = useState(() => [])

  // fetch all blogs from DB | [pagination] max 25 blogs will be fetched
  const fetchedBlogs = async () => {
    const response = await axios.get(`${BASE_URL}/api/v1/getBlogs`)
    setBlogs(response.data.data)
  }

  useEffect(() => {
    fetchedBlogs()
  }, [blogs])

  return (
    <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '10px',
      padding: '10px',
      margin: 'auto'
    }}
    >
        <h1
        // make center
        style={
          {
            textAlign: 'center',
            color: 'darkblue'
          }
        }
        > All Saved Blogs </h1>
        {
          blogs.map((blog, index) => {
            return (
            <div
            key={blog._id}
            style={
              {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '20px',
                border: '1px solid black',
                borderRadius: '10px',
                padding: '10px',
                width: '50%',
                margin: 'auto',
                backgroundColor: 'lightgrey'
              }
            }
            >
              <h3
              style={
                {
                  color: 'darkblue'

                }
              }
              >{++index}.  {blog.text} </h3>
            </div>
            )
          })
        }
    </div>
  )
}

export default ShowBlogs
