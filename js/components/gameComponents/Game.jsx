import React from 'react';
import Question from './Question.jsx'
import Answers from './Answers.jsx'
import Timer from './Timer.jsx'
import CurrentScore from './CurrentScore.jsx'


class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: '',
      correctAnswer: '',
      shuffledAnswers: [],
      loading: true,
      canAnswer: true,
      text: null,
      scores: 0,
      secsLeft: 30,

    }
  }

  shuffle = arr => {
      for (let i = arr.length; i; i--) {
          let j = Math.floor(Math.random() * i);
          [arr[i - 1], arr[j]] = [arr[j], arr[i - 1]];
      }

      return arr;
  }

  insertQuestion = data => {
  let incorrectAnswer = data.results[0].incorrect_answers;
  let correctAnswer = data.results[0].correct_answer;
  let allAnswers = incorrectAnswer.concat(correctAnswer);
    this.setState({
      question: data.results[0].question,
      correctAnswer: data.results[0].correct_answer,
      shuffledAnswers: this.shuffle(allAnswers),
      loading: false,
    });
    console.log('Correct answer: ', this.state.correctAnswer);

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
              secsLeft: 30,
          });
  }

  finishGame = (text, nextRound = false) => {
    if (!nextRound) {
            clearInterval(this.intervalId);
        }

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

    this.intervalId = setInterval(() => {
        this.setState({
            secsLeft: this.state.secsLeft - 1,
        });
        if (this.state.secsLeft === 0){
            this.finishGame('Koniec czasu!');
        }
    }, 700);

  }

  componentWillUnmount(){
      clearInterval(this.intervalId);
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
        <Question question = {this.state.question} />
        <Answers shuffledAnswers = {this.state.shuffledAnswers} canAnswer = {this.state.canAnswer} onMyClick = {this.handleAnsSelect}/>

        <CurrentScore currentScore = {this.state.scores}/>
        <Timer time = {this.state.secsLeft} />
      </div>
    }
  }
}


 module.exports = Game;
