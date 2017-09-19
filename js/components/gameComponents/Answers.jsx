import React from 'react';


class Answers extends React.Component {
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
    const letter = ['A: ', 'B: ', 'C: ', 'D: '];
    const btns = this.state.answers.map( (answer, i) => {
            return <button key = {i} disabled={!this.props.canAnswer}
                onClick = {e => this.onHandleClick(answer)} >
                {letter[i] + answer}
            </button>;
        });

      return <div className = 'container'>
        {btns}
      </div>
    }
}


 module.exports = Answers;
