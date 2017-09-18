import React from 'react';


class Answers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: this.props.question.incorrect_answers.concat(this.props.question.correct_answer)
    }
    console.log(this.state.answers);
  }

  shuffle = arr => {
      for (let i = arr.length; i; i--) {
          let j = Math.floor(Math.random() * i);
          [arr[i - 1], arr[j]] = [arr[j], arr[i - 1]];
      }
  }

  componentDidMount() {
    this.shuffle(this.state.answers)
    console.log(this.state.answers);
  }


    render() {
      const btns = this.state.answers.map( (n, i) => {
              return <button key = {i} >
                  {n}
              </button>;
          });

        return <div className = 'container'>
          {btns}
        </div>
      }
}


 module.exports = Answers;
