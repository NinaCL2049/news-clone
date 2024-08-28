import React, { useState } from 'react';

const SearchForm = ({
  forSearch,
  sortBy,
  timeSearch,
  handleTypeSearch,
  handleTimeSearch,
  handleSortBy
  }) => {

  return (
    <div className="search-form">
      <label>Search</label>
      <select placeholder="Select" className="for-search targeted-search" onChange={handleTypeSearch}>
        <option value="all">All</option>
        <option value="story">Stories</option>
        <option value="comment">Comments</option>
        <option value="ask_hn">Ask HN</option>
        <option value="show_hn">Show HN</option>
        <option value="job">Jobs</option>
        <option value="poll">Polls</option>
      </select>

      <label>By</label>
      <select placeholder="Select" className="by-search targeted-search" onChange={(e) => handleSortBy(e.target.value)}>
        <option value="popularity">Popularity</option>
        <option value="date">Date</option>
      </select>

      <label>For</label>
      <select placeholder="Select" className="time-search targeted-search" onChange={handleTimeSearch}>
        <option value="all-time">All Time</option>
        <option value="last-24h">Last 24h</option>
        <option value="past-week">Past Week</option>
        <option value="past-month">Past Month</option>
        <option value="past-year">Past Year</option>
      </select>

    </div>
  )

};

export default SearchForm;
