import React from 'react';
import DisplayArticleCard from './DisplayArticleCard'

const ListArticles = ({
  title,
  author,
  url,
  points,
  num_comments,
  created_at,
  searchQuery,
  listOfArticles
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
              {listOfArticles.length > 0 ? (
          listOfArticles.map((article, index) => (
            <DisplayArticleCard
              key={index}
              title={article.title || article.story_title}
              author={article.author}
              url={article.url || article.story_url}
              points={article.points || 'N/A'}
              num_comments={article.num_comments || 'N/A'}
              created_at={article.created_at}
              searchQuery={searchQuery}
              
            />
            ))
          ) : (
          <p>No stories found.</p>
        )}

    </div>
  );
}

export default ListArticles;
