import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


function Movie(props) {
  console.log(props);
  if (props.movie.title) {
    return (
      <div id='movie'>
        <h3 id='movie-title'>{props.movie.title}</h3>
        <h6 id='movie-year'>{props.movie.year}</h6>
        <img id='movie-poster' src={props.movie.poster} alt='' />
      </div>
    )
  }
  return (
    <div id='movie'></div>
  )
}

class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ''
    }
    this.findMovie = this.findMovie.bind(this);
    this.updateSearch = this.updateSearch.bind(this);
  }

  findMovie(e) {
    e.preventDefault();
    let query = 'https://www.omdbapi.com/?t=' + this.state.search;
    fetch(query)
      .then(response => response.json())
      .then(json => this.props.sendMovieResponse(json))
      .catch(error =>
        this.setState({
          message: error
        })
      );
  }

  updateSearch(e) {
    this.setState({
      search: e.target.value
    });
  }

  render() {
    return (
      <form id='search-form' onSubmit={this.findMovie}>
        <input id='search-input' type='text' placeholder='Movie title' value={this.state.search} onChange={this.updateSearch} />
        <input id='search-button' type='submit' value='Search' />
      </form>
    )
  }

}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: {
        title: '',
        year: '',
        poster: ''
      }
    }
    this.handleMovieResponse = this.handleMovieResponse.bind(this);
  }

  handleMovieResponse(response) {
    this.setState({
      movie: {
        title: response.Title,
        year: response.Year,
        poster: response.Poster
      }
    });
  }

  render() {
    return (
      <div className='App'>
        <div id='app-div'>
          <h4>Enter a movie title</h4>
          <SearchForm sendMovieResponse={this.handleMovieResponse} />
          <Movie movie={this.state.movie} />
        </div>
      </div>
    );
  }

}

export default App;
