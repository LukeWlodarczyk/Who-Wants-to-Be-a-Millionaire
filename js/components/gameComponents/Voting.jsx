import React from 'react';

class Voting extends React.Component {

  onHandleExit = () => {
      if ( typeof this.props.onMyClickExit === 'function' ){
          this.props.onMyClickExit();
      }
  };

  render() {

    return <div className = 'votingResults'>
      <button onClick = {this.onHandleExit}>Exit</button>
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


 module.exports = Voting;
