import React from 'react';


export default class Answers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: ['A', 'B', 'C', 'D']
    }
  }


  onHandleClick = (answer, i) => {
      if ( typeof this.props.onMyClick === 'function' ){
          this.props.onMyClick(answer, i);
      }
  };



  componentWillReceiveProps(nextProps) {
    if(nextProps.allAnswers !== this.props.allAnswers) {
      this.setState({
        answers: nextProps.allAnswers,
      });
    }
  }

  createMarkup = (i, text) => {
  return {__html: i + text};
  }




  render() {
    const letters = ['A: ', 'B: ', 'C: ', 'D: '];
    const btns = this.state.answers.map( (answer, i) => {
            return <button
                      className = 'answerBtn'
                      key = {answer}
                      disabled={!this.props.canAnswer[i]}
                      onClick = {e => this.onHandleClick(answer, i)} dangerouslySetInnerHTML={this.createMarkup(letters[i], answer)} >
                    </button>
        });

      return <div className = 'asnwersContainer'>
        {btns}
      </div>
    }
}
