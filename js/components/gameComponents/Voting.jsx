import React from 'react';

export default class Voting extends React.Component {


  render() {

    return <div className = 'votingResults'>
      <div className = 'votingResult'>
        <div className = 'percentage'></div>
        <div className = 'percentageDiagram'></div>
        <div className = 'letter'>A</div>
      </div>
      <div className = 'votingResult'>
        <div className = 'percentage'></div>
        <div className = 'percentageDiagram'></div>
        <div className = 'letter'>B</div>
      </div>
      <div className = 'votingResult'>
        <div className = 'percentage'></div>
        <div className = 'percentageDiagram'></div>
        <div className = 'letter'>C</div>
      </div>
      <div className = 'votingResult'>
        <div className = 'percentage'></div>
        <div className = 'percentageDiagram'></div>
        <div className = 'letter'>D</div>
      </div>
    </div>
  }
}
