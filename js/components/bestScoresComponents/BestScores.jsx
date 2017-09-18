import React from 'react';


class BestScores extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quote: '',
      loading: true
    }
  }


    render() {
        return <div className = 'container'>
          <h1>Best Scores</h1>
        </div>
      }
}


 module.exports = BestScores;
