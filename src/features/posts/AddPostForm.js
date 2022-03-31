import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';

import { postAdded } from './postsSlice';

const AddPostForm = () => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  const handleTitleChange = (evt) => setTitle(evt.target.value);
  const handleTextChange = (evt) => setText(evt.target.value);
  const handleFormSubmit = (evt) => {
    evt.preventDefault();
    if (title && text) dispatch(postAdded(title, text));

    setTitle('');
    setText('');
  };

  return (
    <section>
      <h2>Add a New Post</h2>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={handleTitleChange}
        />
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={text}
          onChange={handleTextChange}
        />
        <button type="submit">Save Post</button>
      </form>
    </section>
  );
};

export default AddPostForm;
