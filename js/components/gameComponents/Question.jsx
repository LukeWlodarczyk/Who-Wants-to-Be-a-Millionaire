import React from 'react';


class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: this.props.question,
    }
  }

  componentWillReceiveProps(nextProps) {
      this.setState({
        question: nextProps.question,
      });
  }

  createMarkup = () => {
  return {__html: this.state.question};
  }


  render() {
      return <div className = 'container'>
        <p dangerouslySetInnerHTML={this.createMarkup()} />
      </div>
    }
}


 module.exports = Question;
