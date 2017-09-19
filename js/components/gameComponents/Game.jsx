import React from 'react';
import Question from './Question.jsx'
import Answers from './Answers.jsx'


class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: '',
      correctAnswer: '',
      loading: true,
      canAnswer : true,
      text : null,
      scores : 0,

    }
  }
  insertQuestion = data => {
    this.setState({
      question: data,
      correctAnswer: data.results[0].correct_answer,
      loading: false,
    });
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
        this.insertQuestion(data)
        console.log(this.state.correctAnswer);
    })
    .catch(error => {
      console.log(error);
    });
  }

  startGame = () => {
    this.getQuestion();

    this.setState({
              canAnswer : true,
              text : null,
          });
  }

  finishGame = (text, nextRound = false) => {

      this.setState({
          canAnswer : false,
          text,
      });

      if (nextRound){
          this.setState({
              scores : this.state.scores + 1,
          });
          this.startGame();
      }
  }



  componentDidMount() {
    this.startGame();
  }



  handleAnsSelect = answer => {
    if (answer === this.state.correctAnswer){
              this.finishGame('Brawo!', true);
          } else {
              this.finishGame('Nieprawidłowa odpowiedź!');
          }
  }



  render() {
    if(this.state.loading) {
      return null;
    } else {
      return <div className = 'container'>
        <Question question = {this.state.question.results[0]} />
        <Answers question = {this.state.question.results[0]} canAnswer = {this.state.canAnswer} onMyClick = {this.handleAnsSelect}/>  
        <h3>Punkty: {this.state.scores}</h3>
      </div>
    }
  }
}


 module.exports = Game;
