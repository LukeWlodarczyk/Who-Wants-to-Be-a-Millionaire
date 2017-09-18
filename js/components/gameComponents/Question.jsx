import React from 'react';


class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: this.props.question.question,
    }
  }

  componentDidUpdate() {
    this.setState({
      question: this.props.question.question,
    });
  }


    render() {
        return <div className = 'container'>
          <p>{this.state.question}</p>
        </div>
      }
}


 module.exports = Question;
