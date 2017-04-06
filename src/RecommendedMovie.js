import React, { Component } from 'react';

class RecommendedMovie extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='recommended-movie-div'>
        <p className='recommended-movie-header'>{this.props.movie.title}</p>
        <img className='recommended-movie-poster'src={this.props.movie.poster} alt='' />
      </div>
    )
  }
}

export default RecommendedMovie;