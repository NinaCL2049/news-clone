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
    <form className="search-form" onSubmit={handleSubmit}>
      <div>
        <input type="text" placeholder="Tag" value={tag} onChange={(e) => setTag(e.target.value)} />
      </div>
      <div>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </div>
      <div>
        <input type="text" placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} />
      </div>
      <div>
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchForm;
