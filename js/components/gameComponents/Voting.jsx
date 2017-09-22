import React from 'react';

class Voting extends React.Component {


  render() {

    return <div className = 'voting'>
      <div className = 'votingResult'>
        <div className = 'percentageResult'></div>
        <div className = 'percentageResult'></div>
        <div className = 'percentageResult'></div>
        <div className = 'percentageResult'></div>
      </div>
      <div className = 'letters'>
        <span className = 'letter'>A</span>
        <span className = 'letter'>B</span>
        <span className = 'letter'>C</span>
        <span className = 'letter'>D</span>
      </div>
    </div>
  }
}


 module.exports = Voting;
