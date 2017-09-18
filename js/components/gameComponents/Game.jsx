import React from 'react';
import Question from './Question.jsx'
import Answers from './Answers.jsx'

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: '',
      loading: true
    }
  }

  getQuestion = () => {
    const baseUrl = 'https://opentdb.com/api.php?amount=1&difficulty=easy&type=multiple';
        fetch(baseUrl)
          .then( data => {
            if(data.ok){
                return data.json();
            }else{
                throw new Error('Error getting data');
            }
        }).then(data => {
          this.setState({
            question: data,
            loading: false,
          });
        })
        .catch(error => {
          console.log(error);
        });

  }

  componentDidMount() {
    this.getQuestion();
  }


  render() {
    if(this.state.loading) {
      return null;
    } else {
      return <div className = 'container'>
        <Question question = {this.state.question.results[0]} />
        <Answers question = {this.state.question.results[0]} />
      </div>
    }
  }
}


 module.exports = Game;
