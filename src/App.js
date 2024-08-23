import React, { Component } from 'react'
import './App.css';
import ListArticles from './components/ListArticles';
import SearchForm from './components/SearchForm';
import DisplayArticleCard from './components/DisplayArticleCard';

class App extends Component {

  constructor(props) {

    super(props);

    this.state = {
      listOfArticles: [],
      searchQuery: '',
      typeSearch: 'all', // Default to 'all'
      bySearch: '', // Default to 'popularity'
      timeSearch: 'all-time' // Default to 'all-time'
    };
  }

  // Fetch articles when component mounts
  componentDidMount() {
    this.fetchArticles();
  }


  // Function for handling search input
  handleInputChange = (e) => {
    this.setState({ searchQuery: e.target.value }, () => {
      this.searchPosts();
    });
  }

  handleTypeSearch = (e) => {
    this.setState({ typeSearch: e.target.value });
  }

  handleTimeSearch = (e) => {
    this.setState({ timeSearch: e.target.value });
  }

  // Function for fetching articles
  fetchArticles = () => {
    fetch('http://hn.algolia.com/api/v1/search?tags=front_page')
    .then((response) => response.json())
    .then((data) => {
      this.setState({
        listOfArticles: data.hits,
      });
    });
  } 

  // Function for searching time 
  handleTimeSearch = (e) => {
    this.setState({timeSearch: e.target.value}, () => {
      this.fetchTimeSearch();
    })
  }

  // Functions for the search form 
  fetchTimeSearch = () => {
    fetch(`http://hn.algolia.com/api/v1/search_by_date?query=${this.state.timeSearch}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      this.setState({listOfArticles: data.hits});
      })
  }

  fetchTypeSearch = () => {
    const tagToTitlePrefix = {
      'ask-hn': 'Ask HN:',
      'show-hn': 'Show HN:',
      'jobs': 'is hiring',
      'polls': 'Poll:'
    }

    const keyword = this.state.typeSearch;
    const titlePrefix = tagToTitlePrefix[keyword] || keyword;
    
    let page = 0;
    fetch(`http://hn.algolia.com/api/v1/search?page=${page}&hitsPerPage=1000`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Fetched Data:', data); // Log the data to see what we're getting

      if (!data || !data.hits) {
        console.error('Data or data.hits is undefined');
        return;
      }

      const filteredArticles = data.hits.filter(article => {
        const title = article.title || article.story_title || '';
        return title.includes(titlePrefix) 
      });

      if (filteredArticles.length === 0) {
        console.log('No articles found with the prefix:', titlePrefix);
      }

      this.setState({ listOfArticles: filteredArticles });
    })
    .catch(error => {
      console.error('error:', error);
    });
  }

  // Function for searching by popularity/date
  fetchBySearch = (sortBy = 'popularity', keyword = this.state.typeSearch) => {
    fetch(`http://hn.algolia.com/api/v1/search?tags=${keyword}&hitsPerPage=1000`)
    .then(response => response.json())
    .then(data => {
      if (!data || !data.hits) {
        console.error('Data or data.hits is undefined');
        return;
      }

      let sortedArticles;

      if (sortBy === 'popularity') {
        sortedArticles = data.hits.sort((a, b) => b.points - a.points);
      } else if (sortBy === 'date') {
        sortedArticles = data.hits.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      } else {
        sortedArticles = [...data.hits]; // Create a copy if no sorting is needed
      }

      console.log(`Sorted articles by ${sortBy}:`, sortedArticles);

      this.setState({ listOfArticles: sortedArticles });
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }

  // Function for searching by type 
  handleTypeSearch = (e) => {
    this.setState({typeSearch: e.target.value}, () => {
      this.fetchTypeSearch();
    })
  }

  // Functions for searching posts
  searchPosts = (e) => {
    const searchQuery = document.getElementById('search-bar').value

    fetch(`https://hn.algolia.com/api/v1/search?query=${searchQuery}`)
    .then((response) => response.json())
    .then((data) => {
      this.setState({listOfArticles: data.hits});
    });
  }

  handleSearch = (criteria) => {
    this.setState({ searchCriteria: criteria }, () => {
      this.searchPosts(criteria);
    });
  }

  render() {
    return (
      <div className='App'>
        <h1>Hacker News</h1>
        
        <form onSubmit={this.searchPosts}>
          <input
            onChange={this.handleInputChange}
            value={this.state.searchQuery}
            id="search-bar" 
            type="text" 
            placeholder="Search..." 
          />
        </form>

        <SearchForm 
          typeSearch={this.state.typeSearch}
          bySearch={this.state.bySearch}
          timeSearch={this.state.timeSearch}
          handleForSearch={this.handleForSearch}
          handleTimeSearch={this.handleTimeSearch}
          handleTypeSearch={this.handleTypeSearch}
          fetchTimeSearch={this.fetchTimeSearch}
          fetchTypeSearch={this.fetchTypeSearch}
          fetchBySearch={this.fetchBySearch}
        />

        <div className="articles-container">
          {this.state.listOfArticles.length > 0 ? (
            this.state.listOfArticles.map((article, index) => (
              <ListArticles
                key={index}
                title={article.title || article.story_title}
                author={article.author}
                url={article.url || article.story_url}
                points={article.points || 'N/A'}
                num_comments={article.num_comments || 'N/A'}
                created_at={article.created_at}
                searchQuery={this.state.searchQuery}
              />
              ))
            ) : (
            <p>No stories found.</p>
          )}
        </div>
      </div>
    );
  }
}


export default App;
