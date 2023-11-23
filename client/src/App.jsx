
import './App.css'
import React from 'react'
import { useState, useRef } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreateBlog from './components/CreateBlog';
import ShowBlogs from './components/ShowBlogs';


function App() {

  return (
    <>
      <div>
            <Router>
              <Routes>
                <Route path="/" element={<CreateBlog />} />
                <Route path="/saved-blogs" element={<ShowBlogs />} />
              </Routes>
            </Router>
      </div>
    </>
  )
}

export default App
