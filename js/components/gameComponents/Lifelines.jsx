import React from 'react';


class Lifelines extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: this.props.shuffledAnswers
    }
    console.log(this.state.answers);
  }


  onHandleClick = answer => {
      if ( typeof this.props.onMyClick === 'function' ){
          this.props.onMyClick(answer);
      }
  };


  componentWillReceiveProps(nextProps) {
    if(nextProps !== this.props.question) {
      this.setState({
        answers: nextProps.shuffledAnswers
      });
    }
  }


  render() {
      return <div className = 'container'>

      </div>
    }
}


 module.exports = Lifelines;
