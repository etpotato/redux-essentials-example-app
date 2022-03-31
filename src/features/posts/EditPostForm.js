import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { postUpdated } from './postsSlice';

const EditPostForm = ({ match }) => {
  const { postId } = match.params;
  const post = useSelector(state => state.posts.find(post => post.id === postId));

  const dispatch = useDispatch();
  const history = useHistory();

  const [title, setTitle] = useState(post.title);
  const [text, setText] = useState(post.content);

  const handleTitleChange = (evt) => setTitle(evt.target.value);
  const handleTextChange = (evt) => setText(evt.target.value);

  const handleFormSubmit = (evt) => {
    evt.preventDefault();
    const newPost = {
      id: postId,
      title,
      content: text,
    };
    if (title && text) {
      dispatch(postUpdated(newPost));
      history.push(`/posts/${postId}`);
    }
  };

  return (
    <section>
      <h2>Edit Post</h2>
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

export default EditPostForm;
