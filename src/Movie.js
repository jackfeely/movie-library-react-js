import React, { Component } from 'react';

class Movie extends Component {
  constructor(props) {
    super(props);
    this.resizePoster = this.resizePoster.bind(this);
    this.sendRecommendedMovie = this.sendRecommendedMovie.bind(this);
    this.toggleInfo = this.toggleInfo.bind(this);
  }

  resizePoster() {
    let moviePoster = document.querySelector('#movie-poster');
    if (moviePoster.style.width === '50%') {
      moviePoster.style.width = '25%';
      moviePoster.style.height = '25%';
    } else {
      moviePoster.style.width = '50%';
      moviePoster.style.height = '50%';
    }
  }

  toggleInfo() {
    let infoDiv = document.querySelector('#info-div');
    if (infoDiv.style.display === 'block') {
      infoDiv.style.display = 'none';
      document.querySelector('#toggle-info-button-show').style.display = 'block';
      document.querySelector('#toggle-info-button-hide').style.display = 'none';
    } else {
      infoDiv.style.display = 'block';
      document.querySelector('#toggle-info-button-show').style.display = 'none';
      document.querySelector('#toggle-info-button-hide').style.display = 'block';
    }
  }

  sendRecommendedMovie() {
    this.props.sendRecommended(this.props.movie);
  }

  render() {
    // movie has been recommended
    let recommendedMoviesVar = this.props.recommended;
    if (recommendedMoviesVar.includes(this.props.movie)) {
      return (
        <div id='movie'>
          <h3 id='movie-title'>{this.props.movie.title}</h3>
          <img id='movie-poster' src={this.props.movie.poster} alt='' onClick={this.resizePoster}/>
          <p id='movie-plot'>{this.props.movie.plot}</p>
          <div id='info-div'>
            <ul id='info-ul'>
              <li className='info-li'><span className='info-li-category'>Director</span><span className='info-li-info'>{this.props.movie.director}</span></li>
              <li className='info-li'><span className='info-li-category'>Writer</span><span className='info-li-info'>{this.props.movie.writer}</span></li>
              <li className='info-li'><span className='info-li-category'>Genre</span><span className='info-li-info'>{this.props.movie.genre}</span></li>
              <li className='info-li'><span className='info-li-category'>Country</span><span className='info-li-info'>{this.props.movie.country}</span></li>
              <li className='info-li'><span className='info-li-category'>Rated</span><span className='info-li-info'>{this.props.movie.rated}</span></li>
              <li className='info-li'><span className='info-li-category'>Runtime</span><span className='info-li-info'>{this.props.movie.runtime}</span></li>
              <li className='info-li'><span className='info-li-category'>Released</span><span className='info-li-info'>{this.props.movie.released}</span></li>
              <li className='info-li'><span className='info-li-category'>Production</span><span className='info-li-info'>{this.props.movie.production}</span></li>
            </ul>
          </div>
          <button id='toggle-info-button' onClick={this.toggleInfo}><span id='toggle-info-button-show'>See more</span><span id='toggle-info-button-hide'>See less</span></button>
          <button id='unrecommend-button' onClick={this.sendRecommendedMovie}>Recommended <b>{this.props.movie.title}</b></button>
        </div>
      )
    }

    // movie has not been recommended
    else if (this.props.movie.title) {
      return (
        <div id='movie'>
          <h3 id='movie-title'>{this.props.movie.title}</h3>
          <img id='movie-poster' src={this.props.movie.poster} alt='' onClick={this.resizePoster}/>
          <p id='movie-plot'>{this.props.movie.plot}</p>
          <div id='info-div'>
            <ul id='info-ul'>
              <li className='info-li'><span className='info-li-category'>Director</span><span className='info-li-info'>{this.props.movie.director}</span></li>
              <li className='info-li'><span className='info-li-category'>Writer</span><span className='info-li-info'>{this.props.movie.writer}</span></li>
              <li className='info-li'><span className='info-li-category'>Genre</span><span className='info-li-info'>{this.props.movie.genre}</span></li>
              <li className='info-li'><span className='info-li-category'>Country</span><span className='info-li-info'>{this.props.movie.country}</span></li>
              <li className='info-li'><span className='info-li-category'>Rated</span><span className='info-li-info'>{this.props.movie.rated}</span></li>
              <li className='info-li'><span className='info-li-category'>Runtime</span><span className='info-li-info'>{this.props.movie.runtime}</span></li>
              <li className='info-li'><span className='info-li-category'>Released</span><span className='info-li-info'>{this.props.movie.released}</span></li>
              <li className='info-li'><span className='info-li-category'>Production</span><span className='info-li-info'>{this.props.movie.production}</span></li>
            </ul>
          </div>
          <button id='toggle-info-button' onClick={this.toggleInfo}><span id='toggle-info-button-show'>See more</span><span id='toggle-info-button-hide'>See less</span></button>
          <button id='recommend-button' onClick={this.sendRecommendedMovie}>Recommend <b>{this.props.movie.title}</b></button>
        </div>
      )
    }

    else {
      return (
        <div></div>
      )
    }

  }
}

export default Movie;