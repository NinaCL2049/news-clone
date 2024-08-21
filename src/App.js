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
    };
  }

  // front page loads on inital render
  componentDidMount() {
    fetch('http://hn.algolia.com/api/v1/search?tags=front_page')
    .then((response) => response.json())
    .then((data) => {
      this.setState({
        listOfArticles: data.hits,
      });
    });
  }

  render() {
    return (
      <div className='App'>
          <h1>Hacker News</h1>
          {this.state.listOfArticles.map((article, index) => (
            <ListArticles
              key={index}
              title={article.title}
              author={article.author}
              url={article.url}
              points={article.points}
              num_comments={article.num_comments}
              created_at={article.created_at}
            />
          ))}
      </div>
    );
  }
}

export default App;
