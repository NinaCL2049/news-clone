import React, { useState } from 'react';

const SearchForm = (props) => {
  const [tag, setTag] = useState('');
  const [date, setDate] = useState('');
  const [author, setAuthor] = useState('');
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onSearch({ tag, date, author, title });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Tag:</label>
        <input type="text" value={tag} onChange={(e) => setTag(e.target.value)} />
      </div>
      <div>
        <label>Date:</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </div>
      <div>
        <label>Author:</label>
        <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} />
      </div>
      <div>
        <label>Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchForm;