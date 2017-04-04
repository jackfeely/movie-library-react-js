import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


function DisplayMovie(props) {
  return (
    <div id='movie'>
      <h3 id='movie-title'>{props.movie.title}</h3>
      <h6 id='movie-year'>{props.movie.year}</h6>
      <img id='movie-poster' src={props.movie.poster} alt='' />
    </div>
  )
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: {
        title: '',
        year: '',
        poster: ''
      },
      search: ''
    }
    this.findMovie = this.findMovie.bind(this);
    this.handleMovieResponse = this.handleMovieResponse.bind(this);
    this.updateSearch = this.updateSearch.bind(this);
  }

  findMovie() {
    let query = 'https://www.omdbapi.com/?t=' + this.state.search;
    fetch(query)
      .then(response => response.json())
      .then(json => this.handleMovieResponse(json))
      .catch(error =>
        this.setState({
          message: 'OOPSIE DAISY' + error
        })
      );
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

  updateSearch(e) {
    this.setState({
      search: e.target.value
    })
  }

  render() {
    return (
      <div className='App'>
        <div id='app-div'>
          <h4>Enter a movie title</h4>
          <input id='movie-search' value={this.state.search} onChange={this.updateSearch} />
          <button id='search-button' onClick={this.findMovie}>Search</button>
          <DisplayMovie movie={this.state.movie} />
        </div>
      </div>
    );
  }

}

export default App;
