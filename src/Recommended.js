import React, { Component } from 'react';
import RecommendedMovie from './RecommendedMovie.js'

class Recommended extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let recommendedMovies = this.props.recommended;
    let recommendedList = recommendedMovies.map((thisMovie) =>
      <li className='recommended-li' key={recommendedMovies.indexOf(thisMovie)}><RecommendedMovie movie={thisMovie}/></li>
    );
    if (this.props.recommended.length > 0) {
      return (
        <div id='recommended-div'>
          <h3 id='recommended-header'>Recommended Movies</h3>
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

export default Recommended;