import React, { useState, useEffect } from 'react'
import './App.css';
import ListArticles from './components/ListArticles';
import SearchForm from './components/SearchForm';
import DisplayArticleCard from './components/DisplayArticleCard';

function App(){
  const [listOfArticles, setListOfArticles] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeSearch, setTypeSearch] = useState('all');
  const [sortBy, setSortBy] = useState('popularity');
  const [forSearch, setForSearch] = useState('');
  const [timeSearch, setTimeSearch] = useState('all-time');

  // Fetch articles on page load
  useEffect(() => {
    fetchArticles();
  }, []);

  // Fetch articles for search query, type, and time, and sort by popularity/date
  useEffect(() => {
    if(searchQuery) {
      searchPosts(searchQuery);
    } else if (typeSearch !== 'all') {
      fetchTypeSearch();
    } else if (timeSearch !== 'all-time') {
      fetchTimeSearch();
    } else if (sortBy !== 'popularity') {
      fetchBySearch(sortBy, forSearch);
    } else {
      fetchArticles();
    }
  }, [searchQuery, sortBy, typeSearch, timeSearch]);

  // Handle functions
  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  }

  const handleTypeSearch = (e) => {
    setTypeSearch(e.target.value);
    fetchTypeSearch();
  }

  const handleTimeSearch = (e) => {
    setTimeSearch(e.target.value);
    fetchTimeSearch();
  }

  const handleSortBy = (sortOption) => {
    setSortBy(sortOption);
  }

  const handleForSearch = (e) => {
    setForSearch(e.target.value);
    fetchBySearch('popularity', e.target.value);
  }

  const handleSearch = (criteria) => {
    setSearchQuery(criteria);
    searchPosts(criteria);
  }

  // Functions for searching posts
  const searchPosts = (e) => {
    const searchQuery = document.getElementById('search-bar').value

    fetch(`https://hn.algolia.com/api/v1/search?query=${searchQuery}`)
    .then((response) => response.json())
    .then((data) => {
      setListOfArticles(data.hits);
    });
  }

  // Function for fetching articles
  const fetchArticles = () => {
    fetch('http://hn.algolia.com/api/v1/search?tags=front_page')
    .then((response) => response.json())
    .then((data) => {
      setListOfArticles(data.hits);
    });
  }

  // Functions for the search form 
  const fetchTimeSearch = () => {
    let queryDate = null;

    switch(timeSearch) {
      case 'all-time':
        fetchArticles();
        return;
      case 'last-24h':
        queryDate = ('popularity', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('T')[0]);
        break;
      case 'past-week':
        queryDate = ('popularity', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]);
        break;
      case 'past-month':
        queryDate = ('popularity', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]);
        break;
      case 'past-year':
        queryDate = ('popularity', new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]);
        break;
      default:
        console.log('Invalid time search');
        return;
      }

    fetch(`http://hn.algolia.com/api/v1/search_by_date?query=${queryDate}`)
    .then((response) => response.json())
    .then((data) => {      
       setListOfArticles(data.hits); 
      })
  }

  // Function for searching by type
  const fetchTypeSearch = () => {
    const tagToTitlePrefix = {
      'ask-hn': 'Ask HN:',
      'show-hn': 'Show HN:',
      'jobs': 'Hiring',
      'polls': 'Poll:'
    }

    const keyword = typeSearch;
    const titlePrefix = tagToTitlePrefix[keyword] || keyword;
    
    fetch(`http://hn.algolia.com/api/v1/search?page=0&hitsPerPage=1000`)
    .then(response => response.json()
    .then(data => {
      const filteredArticles = data.hits.filter(article => {
        const title = article.title || article.story_title || '';
        return title.includes(titlePrefix);
      });
      setListOfArticles(filteredArticles);
    })
    .catch(error => {
      console.log('error:', error);
    }));
  }

  // Function for searching by popularity/date
  const fetchBySearch = (sortBy = 'popularity', keyword = typeSearch) => {
    // Get the current date in the format YYYY-MM-DD 
    const currentDate = new Date().toISOString().split('T')[0];

    fetch(`http://hn.algolia.com/api/v1/search_by_date?query=${currentDate}`)
    .then(response => response.json())
    .then(data => {

      let sortedArticles = [...data.hits];

      // Sort the articles based on the selected option
      if (sortBy === 'popularity') {
        const now = new Date();
        sortedArticles.sort((a, b) => {
          // Calculate the age of the post in days
          const ageA = (now - new Date(a.created_at)) / (1000 * 60 * 60 * 24); // Age in days
          const ageB = (now - new Date(b.created_at)) / (1000 * 60 * 60 * 24);

          // Higher points are better, but older posts are worse
          const scoreA = a.points / Math.log1p(ageA);
          const scoreB = b.points / Math.log1p(ageB);
        
          // Sort by score 
          return scoreB - scoreA;
        });
        // Sort by date
      } else if (sortBy === 'date') {
        // Sorts by most recent post made
        sortedArticles.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      }
      setListOfArticles(sortedArticles);
    })
    .catch(error => {
      console.log('Error:', error);
    });
  }

  return (
    <div className='App'>
      <h1>Hacker News</h1>
      
      <form onSubmit={(e) => { e.preventDefault(); handleSearch(searchQuery) }}>
        <input
          onChange={handleInputChange}
          value={searchQuery}
          id="search-bar" 
          type="text" 
          placeholder="Search..." 
        />
      </form>

      <SearchForm 
        typeSearch={typeSearch}
        sortBy={sortBy}
        timeSearch={timeSearch}
        handleForSearch={handleForSearch}
        handleTimeSearch={handleTimeSearch}
        handleTypeSearch={handleTypeSearch}
        fetchTimeSearch={fetchTimeSearch}
        fetchTypeSearch={fetchTypeSearch}
        fetchBySearch={fetchBySearch}
        handleSortBy={handleSortBy}
      />

      <div className="articles-container">
        {listOfArticles.length > 0 ? (
          listOfArticles.map((article, index) => (
            <ListArticles
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

    </div>
  );
}


export default App;
