import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { postAdded } from './postsSlice';

const AddPostForm = () => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [userId, setUserId] = useState('');
  const dispatch = useDispatch();

  const users = useSelector(state => state.users);

  const handleTitleChange = (evt) => setTitle(evt.target.value);
  const handleTextChange = (evt) => setText(evt.target.value);
  const handleAuthorChange = (evt) => setUserId(evt.target.value);
  const handleFormSubmit = (evt) => {
    evt.preventDefault();
    if (title && text) dispatch(postAdded(title, text, userId));

    setTitle('');
    setText('');
  };

  const canSave = Boolean(title) && Boolean(text) && Boolean(userId)

  const usersOptions = users.map(user => (
    <option key={user.id} value={user.id}>{ user.name }</option>
  ));

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
        <label htmlFor="postAuthor">Author:</label>
        <select id="postAuthor" value={userId} onChange={handleAuthorChange}>
          <option value=""></option>
          {usersOptions}
        </select>
        <button type="submit" disabled={!canSave}>Save Post</button>
      </form>
    </section>
  );
};

export default AddPostForm;
