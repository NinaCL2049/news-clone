import React, { Component } from 'react'
import './App.css';
import ListArticles from './components/ListArticles';
import SearchForm from './components/SearchForm';
import DisplayArticleCard from './components/DisplayArticleCard';

class App extends Component {
  constructor(props){
    super(props)

    this.state = {

    }
  }

  componentDidMount() {
    this.fetchStories();
  }

  fetchStories = async (criteria = {}) => {
    const { tag, date, author, title } = criteria;
    let query = 'https://hn.algolia.com/api/v1/search?';

    if (tag) query += `tags=${tag}&`;
    if (date) query += `numericFilters=created_at_i>${new Date(date).getTime() / 1000}&`;
    if (author) query += `author=${author}&`;
    if (title) query += `query=${title}&`;

    try {
      const response = await fetch(query);
      const data = await response.json();
      this.setState({ stories: data.hits });
    } catch (error) {
      console.error('Error fetching stories:', error);
      this.setState({ stories: [] });
    }
  };

  handleSearch = (criteria) => {
    this.setState({ searchCriteria: criteria }, () => {
      this.fetchStories(criteria);
    });
  };

  render() {
    const { stories } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <h1>Hacker News Stories</h1>
        </header>
        <SearchForm onSearch={this.handleSearch} />
        <ul>
          {stories && stories.length > 0 ? (
            stories.map(story => (
              <li key={story.objectID}>
                <a href={story.url} target="_blank" rel="noopener noreferrer">{story.title}</a>
              </li>
            ))
          ) : (
            <li>No stories found</li>
          )}
        </ul>
      </div>
    );
  }
}

export default App;