import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


function DisplayMovie(props) {
  return (
    <div id='movie'>
      <h3>{props.movie.title}</h3>
      <h6>{props.movie.year}</h6>
      <img src={props.movie.poster} />
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
  }

  findMovie() {
    let query = 'https://www.omdbapi.com/?t=The Master';
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

  render() {
    return (
      <div className="App">
        <h1 id="header">Hello world!</h1>
        <button onClick={this.findMovie}>Search</button>
        <DisplayMovie movie={this.state.movie} />
      </div>
    );
  }

}

export default App;
