import React from 'react';
import DisplayArticleCard from './DisplayArticleCard'

const ListArticles = ({
  
  url,

  searchQuery,
  listOfArticles
  }) => {

    /*Function for navigating to post url*/
  const navigateToPost = (url) => {
    window.open(url, '_blank')
  }

  const highlightQuery = (text) => {
    if (!text || !searchQuery) return text;

    // Escape special characters in search query
    const escapedQuery = searchQuery.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
    const regex = new RegExp(`(${escapedQuery})`, "gi");

    // Replace the matched text with highlight mark
    return text
      .split(regex)
      .map((part, index) =>
        regex.test(part) ? <mark key={index}>{part}</mark> : part
      );
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
              highlightQuery={highlightQuery}
              navigateToPost={navigateToPost}
            />
            ))
          ) : (
          <p>No stories found.</p>
        )}

    </div>
  );
}

export default ListArticles;
