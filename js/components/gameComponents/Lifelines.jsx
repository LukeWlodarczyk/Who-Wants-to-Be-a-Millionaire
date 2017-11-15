import React from 'react';


export default class Lifelines extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      canUseLifelines: this.props.canUseLifelines
    }

  }


  onHandleClickExtraTime = () => {
      if ( typeof this.props.onMyClickAddExtraTime === 'function' ){
          this.props.onMyClickAddExtraTime();
      }
  };

  onHandleClickChangeQuestion = () => {
      if ( typeof this.props.onMyClickChangeQuestion === 'function' ){
          this.props.onMyClickChangeQuestion();
      }
  };

  onHandleClickFiftyFifty = () => {
      if ( typeof this.props.onMyClickFiftyFifty === 'function' ){
          this.props.onMyClickFiftyFifty();
      }
  };

  onHandleClickVoting = () => {
      if ( typeof this.props.onMyClickVoting === 'function' ){
          this.props.onMyClickVoting();
      }
  };

  onHandleDoubleChance = () => {
      if ( typeof this.props.onMyClickDoubleChance === 'function' ){
          this.props.onMyClickDoubleChance();
      }
  };

  componentWillReceiveProps(nextProps) {
    if(nextProps.canUseLifelines !== this.props.canUseLifelines) {
      this.setState({
        canUseLifelines: nextProps.canUseLifelines
      });
    }
  }


  render() {
      return <div className = 'lifelinesContainer'>
          <button className='lifelinesButton' disabled={!this.state.canUseLifelines[0]} onClick = {this.onHandleClickExtraTime} >Extra Time</button>
          <button className='lifelinesButton' disabled={!this.state.canUseLifelines[1]} onClick = {this.onHandleClickFiftyFifty} >50/50</button>
          <button className='lifelinesButton' disabled={!this.state.canUseLifelines[2]} onClick = {this.onHandleClickChangeQuestion} >Change Question</button>
          <button className='lifelinesButton' disabled={!this.state.canUseLifelines[3]} onClick = {this.onHandleClickVoting} >Audience Voting</button>
          <button className='lifelinesButton' disabled={!this.state.canUseLifelines[4]} onClick = {this.onHandleDoubleChance} >Double Chance</button>
      </div>
    }
}
