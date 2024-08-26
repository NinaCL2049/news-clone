import React, { useState } from 'react'



const DisplayArticleCard = (
  {
    title,
    author,
    url,
    points,
    num_comments,
    created_at,
    searchQuery,
    navigateToPost,
    highlightQuery
  }) => {

  return (

  <div className='post-card'>
        
  <div className='post-card-top'>
    <h2>{highlightQuery(title)}</h2>
    <p onClick={navigateToPost}>{url}</p>
  </div>

  <div className='post-card-bottom'>
    <p id='post-author'>Author: {author}</p>
    <p>|</p>
    <p id='post-points'>Points: {points}</p>
    <p>|</p>
    <p id='post-comments'>Comments: {num_comments}</p>
    <p>|</p>
    <p id='post-creation'>Created: {new Date(created_at).toLocaleString()}</p>
  </div>
</div>
)
}

export default DisplayArticleCard;
