import React, { useState, useRef } from 'react';
import axios from 'axios';
import CustomInput from './CustomInput';

const SAVE_AFTER_MS = 999;
const BASE_URL = 'http://localhost:3000';


const CreateBlog = () => {
  const [inputValue, setInputValue] = useState(() => '');
  const [isSaving, setIsSaving] = useState(() => false);
  const autoSaveTimer = useRef();
  const [draftId, setDraftId] = useState(() => null);
  const [draftText, setDraftText] = useState(() => "");

  const updateDraftInDB = async (value) => {
    const response = await axios.post(`${BASE_URL}/api/v1/createAndUpdate`, { id: draftId, draft: value });
    setDraftText(response.data.data.text);
    setDraftId(response.data.data._id);
    console.log(response);
  }

  const handleInput = (event) => {

    const { target: { value = '' } } = event;

    setInputValue(value);

    if (autoSaveTimer.current) {
      clearTimeout(autoSaveTimer.current);
    }

    setIsSaving(true);

    autoSaveTimer.current = setTimeout(async () => {

      await updateDraftInDB(value);
      setDraftText(value);
      console.log("App.jsx");
      console.log(draftText);
      console.log(draftId);

      clearTimeout(autoSaveTimer.current);
      setIsSaving(false);
    }, SAVE_AFTER_MS);

  };

  const handleDelete = async () => {
    if (draftText) {
      const response = await axios.post(`${BASE_URL}/api/v1/deleteBlogByID`, { id: draftId });
      setDraftText("");
      setDraftId(null);
      // delete text from input field
      setInputValue("");
      console.log(response);
    } else {
      console.log("nothing to delete");
    }
  }


  return (
    <div>
      <h1>Auto-save Implementation</h1>
      <span className="alignText">
        <p>Draft Status: </p>
        <p>
          {isSaving ? 'Saving... ' : 'Saved'}
        </p>
      </span>

      <CustomInput value={inputValue} onChange={handleInput} />

      <span className="alignText">
        <p>Draft saved to DataBase </p>
        <p
          style={{
            color: 'green',
            fontWeight: 'bold',
            fontSize: '30px'
          }}
        >{
            draftText
          }</p>


        <button
          onClick={handleDelete}
        >
          Click to Delete draft from DB
        </button>
      </span>
    </div>
  )
}

export default CreateBlog

