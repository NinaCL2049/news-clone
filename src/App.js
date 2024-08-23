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
      searchCriteria: ''
    };
  }

  componentDidMount() {
    this.fetchArticles();
  }

  fetchArticles = () => {
    fetch('http://hn.algolia.com/api/v1/search?tags=front_page')
    .then((response) => response.json())
    .then((data) => {
      this.setState({
        listOfArticles: data.hits,
      });
    });
  } 

  searchPosts = (e) => {
    const searchQuery = document.getElementById('search-bar').value

    fetch(`https://hn.algolia.com/api/v1/search?query=${searchQuery}`)
    .then((response) => response.json())
    .then((data) => {
      this.setState({listOfArticles: data.hits});
    });
  }

  handleInputChange = (e) => {
    this.setState({ searchQuery: e.target.value }, () => {
      this.searchPosts()
    })
  }

  handleSearch = (criteria) => {
    this.setState({ searchCriteria: criteria }, () => {
      this.searchPosts(criteria);
    });
  }

  // Fetch stories based on search criteria to front page
  //fetchSearchQueries = async (criteria = {}) => {
  //  const { tag, date, author, title } = criteria;
  //  let query = 'https://hn.algolia.com/api/v1/search?';
  //
  //  if (tag) query += `tags=${tag}&`;
  //  if (date) query += `numericFilters=created_at_i>${new Date(date).getTime() / 1000}&`;
  //  if (author) query += `author=${author}&`;
  //  if (title) query += `query=${title}&`;
  //
  //  try {
  //    const response = await fetch(query);
  //    const data = await response.json();
  //    this.setState({ stories: data.hits });
  //  } catch (error) {
  //    console.error('Error fetching stories:', error);
  //    this.setState({ stories: [] });
  //  }
  //}

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

        <SearchForm onSearch={this.handleSearch}/>

        <div className="articles-container">
          {this.state.listOfArticles.length > 0 ? (
            this.state.listOfArticles.map((article, index) => (
              <ListArticles
                key={index}
                title={article.title}
                author={article.author}
                url={article.url}
                points={article.points}
                num_comments={article.num_comments}
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
