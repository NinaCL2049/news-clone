import React from 'react'

const ListArticles = ({
  title,
  author,
  url,
  points,
  num_comments,
  created_at,
  searchQuery
  }) => {

    /*Function for navigating to post url*/
  const navigateToPost = () => {
    window.open(url, '_blank')
  }

  const highlightQuery = (text) => {
    if(!text) return null;

    if (!searchQuery) return text;

    // Escape special characters in search query
    const escapedQuery = searchQuery.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
    const regex = new RegExp(escapedQuery, 'gi');

    // Split the text based on the search query
    const parts = text.split(regex);
    
    // If there's only one part, it means no match was found, so return plain text
    if (parts.length === 1) {
      return text;
    }

    return parts.map((part, index, array) => {
      if (index < array.length - 1) {
        // Highlight the part if it's not the last part (i.e., it's followed by a match)
        return (
          <React.Fragment key={index}>
            {part}
            <mark>{searchQuery}</mark>
          </React.Fragment>
        );
      }
      // Return the last part without highlighting (because it's after the last match)
      return <React.Fragment key={index}>{part}</React.Fragment>;
    });
  };

  return (
    <div className='articles-list'>
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
    </div>
  );
}

export default ListArticles;
