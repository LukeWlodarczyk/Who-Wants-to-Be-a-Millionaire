import React from 'react';


class Answers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentScore: this.props.currentScore,
    }

  }





  componentWillReceiveProps(nextProps) {
    if(nextProps.currentScore !== this.props.currentScore) {
      this.setState({
        currentScore: nextProps.currentScore
      });
    }
  }


  render() {
      return <div className = 'container'>
        <p>{this.state.currentScore}</p>
      </div>
    }
}


 module.exports = Answers;
