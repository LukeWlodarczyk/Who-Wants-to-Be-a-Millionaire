import React from 'react';


class Lifelines extends React.Component {
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

  componentWillReceiveProps(nextProps) {
    if(nextProps.canUseLifelines !== this.props.canUseLifelines) {
      this.setState({
        canUseLifelines: nextProps.canUseLifelines
      });
    }
  }


  render() {
      return <div className = 'container'>
          <button disabled={!this.state.canUseLifelines[0]} onClick = {this.onHandleClickExtraTime} >Extra Time</button>
          <button disabled={!this.state.canUseLifelines[1]} onClick = {this.onHandleClickFiftyFifty} >50/50</button>
          <button disabled={!this.state.canUseLifelines[2]} onClick = {this.onHandleClickChangeQuestion} >Change Question</button>
      </div>
    }
}


 module.exports = Lifelines;
