import React, { useState, useRef } from 'react'
import axios from 'axios'
import CustomInput from './CustomInput'
import { Link } from 'react-router-dom'

const SAVE_AFTER_MS = 999
const BASE_URL = 'http://localhost:3000'

const CreateBlog = () => {
  const [inputValue, setInputValue] = useState(() => '')
  const [isSaving, setIsSaving] = useState(() => false)
  const autoSaveTimer = useRef()
  const [draftId, setDraftId] = useState(() => null)
  const [draftText, setDraftText] = useState(() => '')

  // update draft in DB
  const updateDraftInDB = async (value) => {
    const response = await axios.post(`${BASE_URL}/api/v1/createAndUpdate`, { id: draftId, draft: value })
    setDraftText(response.data.data.text)
    setDraftId(response.data.data._id)
  }

  // handle input change using useRef [ debounce method] and autosave to DB
  const handleInput = (event) => {
    const { target: { value = '' } } = event

    setInputValue(value)

    if (autoSaveTimer.current) {
      clearTimeout(autoSaveTimer.current)
    }

    setIsSaving(true)

    autoSaveTimer.current = setTimeout(async () => {
      await updateDraftInDB(value)
      setDraftText(value)

      clearTimeout(autoSaveTimer.current)
      setIsSaving(false)
    }, SAVE_AFTER_MS)
  }

  // delete draft from DB
  const handleDelete = async () => {
    if (draftText) {
      // eslint-disable-next-line no-unused-vars
      const response = await axios.post(`${BASE_URL}/api/v1/deleteBlogByID`, { id: draftId })
      setDraftText('')
      setDraftId(null)
      // delete text from input field
      setInputValue('')
    } else {
      alert('No draft to delete')
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '15px'
      }}
    >
      <h1>Blog autosave feature Implementation</h1>
      <span className="alignText">
        <p
          style={{
            fontWeight: 'bold',
            fontSize: '30px'
          }}

        >Draft Status: {isSaving ? 'Saving... ' : 'Saved'} </p>

      </span>

      <CustomInput
        value={inputValue}
        onChange={handleInput}
        placeholder="Start typing here..."
        style={{
          width: '500px',
          height: '200px',
          padding: '6px',
          fontSize: '20px',
          borderRadius: '10px',
          border: '1px solid black',
          outline: 'none',
          textAlign: 'center'
        }}
      />

      <span className="alignText"
      >
        <p
          style={{
            fontWeight: 'bold',
            fontSize: '30px'
          }}
        >Draft saved to DataBase </p>
        <p
          style={{
            color: 'green',
            fontWeight: 'bold',
            fontSize: '30px'
          }}
        >
          {
            draftText
          }
        </p>

        <button
          onClick={handleDelete}
          style={{
            width: '300px',
            height: '90px',
            borderRadius: '10px',
            border: '1px solid black',
            outline: 'none',
            fontSize: '20px',
            fontWeight: 'bold',
            cursor: 'pointer',
            textDecoration: 'underline'
          }}
        >
          Click to Delete draft from DataBase
        </button>
        <br />
        <button
          style={{
            width: '300px',
            height: '90px',
            borderRadius: '10px',
            border: '1px solid black',
            outline: 'none',
            fontSize: '20px',
            fontWeight: 'bold',
            cursor: 'pointer',
            textUnderlineOffset: 'none'
          }}
        >
          <Link
            to="/saved-blogs"
            style={{
              textDecoration: 'underline',
              color: 'black'
            }}
          >
            Click to see all saved blogs
          </Link>
        </button>
      </span>
    </div>
  )
}

export default CreateBlog
