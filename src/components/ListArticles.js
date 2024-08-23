import React from 'react'

const ListArticles = (props) => {

  const { title, author, url, points, num_comments, created_at } = props

    /*Function for navigating to post url*/
  const navigateToPost = () => {
    window.open(url, '_blank')
  }

  return (
    <div className='articles-list'>
      <div className='post-card'>
        <div className='post-card-top'>
          <h2>{title}</h2>
          <p onClick={navigateToPost}>{url}</p>
        </div>

        <div className='post-card-bottom'>
          <p id='post-author'>Author: {author}</p>
          <p>|</p>
          <p id='post-creation'>Created: {created_at}</p>
          <p>|</p>
          <p id='post-points'>Points: {points}</p>
          <p>|</p>
          <p id='post-comments'>Comments: {num_comments}</p>
        </div>
      </div>
    </div>
  );
}

export default ListArticles;