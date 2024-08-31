import React, { useState } from 'react';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from '@mui/icons-material/Favorite';
import NavigationIcon from '@mui/icons-material/Navigation';
import Paper from '@mui/material/Paper';




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
    <h2 onClick={() => navigateToPost(url)}>{highlightQuery(title)}</h2>
    
    <p onClick={() => navigateToPost(url)}>{url}</p>
  </div>

  <div className='post-card-bottom'>
    <p id='post-author'>by {author}</p>
    <p>|</p>
    <p id='post-points'>Points: {points}</p>
    <p>|</p>
    <p id='post-comments'>Comments: {num_comments}</p>
    <p>|</p>
    <p id='post-creation'>{new Date(created_at).toLocaleString()}</p>
  </div>
</div>
)
}

export default DisplayArticleCard;
