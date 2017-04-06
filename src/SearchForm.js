import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';

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
    this.setState({ search: '' });
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

export default SearchForm;