import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


class Recommended extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let recommendedMovies = this.props.recommended;
    let recommendedList = recommendedMovies.map((movie) =>
      <li className='recommended-li' key={recommendedMovies.indexOf(movie)}>{movie.title}</li>
    );
    if (this.props.recommended.length > 0) {
      return (
        <div id='recommended-div'>
          <ul id='recommended-ul'>
            {recommendedList}
          </ul>
        </div>
      )
    }
    return (
      <div></div>
    )
  }
}

class Movie extends Component {
  constructor(props) {
    super(props);
    this.sendRecommendedMovie = this.sendRecommendedMovie.bind(this);
  }

  sendRecommendedMovie() {
    this.props.sendRecommended(this.props.movie);
  }

  render() {
    if (this.props.movie.title) {
      return (
        <div id='movie'>
          <h3 id='movie-title'>{this.props.movie.title}</h3>
          <h6 id='movie-year'>{this.props.movie.year}</h6>
          <img id='movie-poster' src={this.props.movie.poster} alt='' />
          <button id='recommend-button' onClick={this.sendRecommendedMovie}>Recommend</button>
        </div>
      )
    }
    return (
      <div id='movie'></div>
    )
  }
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
      },
      recommended: []
    }
    this.handleMovieResponse = this.handleMovieResponse.bind(this);
    this.handleRecommended = this.handleRecommended.bind(this);
  }

  handleMovieResponse(movieResponse) {
    this.setState({
      movie: {
        title: movieResponse.Title,
        year: movieResponse.Year,
        poster: movieResponse.Poster
      }
    });
  }

  handleRecommended(movie) {
    let recommendedMovies = this.state.recommended;
    if (!recommendedMovies.includes(movie)) {
      recommendedMovies.push(movie);
    }
    this.setState({
      recommended: recommendedMovies
    })
  }

  render() {
    return (
      <div className='App'>
        <div id='app-div'>
          <h4>Enter a movie title</h4>
          <SearchForm sendMovieResponse={this.handleMovieResponse} />
          <Movie movie={this.state.movie} sendRecommended={this.handleRecommended} />
          <Recommended recommended={this.state.recommended} />
        </div>
      </div>
    );
  }

}

export default App;
