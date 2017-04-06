import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SearchForm from './SearchForm.js';
import Movie from './Movie.js';
import Recommended from './Recommended.js'


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
        poster: movieResponse.Poster,
        actors: movieResponse.Actors,
        country: movieResponse.Country,
        director: movieResponse.Director,
        genre: movieResponse.Genre,
        plot: movieResponse.Plot,
        production: movieResponse.Production,
        rated: movieResponse.Rated,
        released: movieResponse.Released,
        runtime: movieResponse.Runtime,
        writer: movieResponse.Writer
      }
    });
  }

  handleRecommended(movie) {
    let recommendedMovies = this.state.recommended;
    if (!recommendedMovies.includes(movie)) {
      recommendedMovies.push(movie);
    } else {
      recommendedMovies.splice(recommendedMovies.indexOf(movie), 1);
    }
    this.setState({
      recommended: recommendedMovies
    })
  }

  render() {
    return (
      <div className='App'>
        <div id='app-div'>
          <h3 id='app-div-header'>Enter a movie title</h3>
          <SearchForm sendMovieResponse={this.handleMovieResponse} />
          <Movie movie={this.state.movie} recommended={this.state.recommended} sendRecommended={this.handleRecommended} />
          <Recommended recommended={this.state.recommended} />
        </div>
      </div>
    );
  }

}

export default App;
