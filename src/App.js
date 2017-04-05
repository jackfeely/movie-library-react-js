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
          <h3>Recommended Movies</h3>
          <ul id='recommended-ul'>
            {recommendedList}
          </ul>
        </div>
      )
    }
    return (
      <div id='recommended-div'>
        <h3 id='recommended-header'>Recommended Movies</h3>
        <p id='recommended-empty-note'>No recommended movies...search first, then recommend</p>
      </div>
    )
  }
}

class Movie extends Component {
  constructor(props) {
    super(props);
    this.sendRecommendedMovie = this.sendRecommendedMovie.bind(this);
    this.showInfo = this.showInfo.bind(this);
    this.hideInfo = this.hideInfo.bind(this);
  }

  
  showInfo() {
    document.querySelector('#show-info-button').style.display = 'none';
    document.querySelector('#info-div').style.display = 'block';
  }

  hideInfo() {
    document.querySelector('#info-div').style.display = 'none';
    document.querySelector('#show-info-button').style.display = 'block';
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
          <button id='show-info-button' onClick={this.showInfo}>See more info</button>
          <div id='info-div'>
            <ul id='info-ul'>
              <li className='info-li'><span className='info-li-category'>Director</span><span className='info-li-info'>{this.props.movie.director}</span></li>
              <li className='info-li'><span className='info-li-category'>Writer</span><span className='info-li-info'>{this.props.movie.writer}</span></li>
              <li className='info-li'><span className='info-li-category'>Genre</span><span className='info-li-info'>{this.props.movie.genre}</span></li>
              <li className='info-li'><span className='info-li-category'>Country</span><span className='info-li-info'>{this.props.movie.country}</span></li>
              <li className='info-li'><span className='info-li-category'>Rated</span><span className='info-li-info'>{this.props.movie.rated}</span></li>
              <li className='info-li'><span className='info-li-category'>Runtime</span><span className='info-li-info'>{this.props.movie.runtime}</span></li>
              <li className='info-li'><span className='info-li-category'>Production</span><span className='info-li-info'>{this.props.movie.production}</span></li>
              <li className='info-li'><span className='info-li-category'>Released</span><span className='info-li-info'>{this.props.movie.released}</span></li>
            </ul>
            <button id='hide-info-button' onClick={this.hideInfo}>Hide info</button>
          </div>
          <button id='recommend-button' onClick={this.sendRecommendedMovie}>Recommend <b>{this.props.movie.title}</b></button>
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
          <Movie movie={this.state.movie} sendRecommended={this.handleRecommended} />
          <Recommended recommended={this.state.recommended} />
        </div>
      </div>
    );
  }

}

export default App;
