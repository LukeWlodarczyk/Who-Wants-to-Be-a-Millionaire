import React from 'react';
import Question from './Question.jsx'
import Answers from './Answers.jsx'
import Timer from './Timer.jsx'
import CurrentScore from './CurrentScore.jsx'
import Lifelines from './Lifelines.jsx'
import winnings from './winnings.jsx'

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: '',
      correctAnswer: '',
      shuffledAnswers: [],
      loading: true,
      canAnswer: true,
      text: 'Who wants to be a millionaire?',
      scores: 0,
      secsLeft: 30,
      canUseLifelines: [false, false, false, false],
      canClickControl: [true, false, false],
      difficulty: ['easy', 'medium', 'hard'],
      currentWinnings: 0,
      guaranteedWinnings: 0,
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
    const incorrectAnswer = data.results[0].incorrect_answers;
    const correctAnswer = data.results[0].correct_answer;
    const allAnswers = incorrectAnswer.concat(correctAnswer);
    this.setState({
      question: data.results[0].question,
      correctAnswer: data.results[0].correct_answer,
      shuffledAnswers: this.shuffle(allAnswers),
      loading: false,
    });
    console.log('Correct answer: ', this.state.correctAnswer);
  }

  getQuestion = () => {
    this.enableAnsBtns();
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

  enableAnsBtns = () => {
    const btns = document.querySelectorAll('.answerBtn')
    btns.forEach(btn => btn.disabled = false)
  }

  prepareQuestion = () => {
    this.getQuestion();
    this.setState({
      canAnswer : true,
      secsLeft: 30 + this.state.secsLeft,
    });
  }

  finishGame = text => {
      clearInterval(this.intervalId);
      this.setState({
        canUseLifelines: [false, false, false, false],
        canClickControl: [true, false, false],
        canAnswer: false,
        text: text,
      });


  }


  startGame = () => {
    //Clear inteval in case multiple click on Start Game button
    clearInterval(this.intervalId);

    this.prepareQuestion();
    this.setState({
      canAnswer: true,
      text: 'Who wants to be a millionaire?',
      scores: 0,
      secsLeft: 30,
      canUseLifelines: [true, true, true, true],
    });

    this.intervalId = setInterval(this.timer.bind(), 1000);
  }

  timer = () => {
    this.setState({
        secsLeft: this.state.secsLeft - 1,
    });
    if (this.state.secsLeft === 0){
        this.finishGame('Koniec czasu!');
    }
  }



  nextRound = () => {
    this.prepareQuestion();
    this.setText('Świetnie! Do dzieła! Oto pytanie')
    this.intervalId = setInterval(this.timer.bind(), 1000);
  }

  setText = text => {
    this.setState({
      text: text,
    });
  }

  handleAnsSelect = answer => {
    if (answer === this.state.correctAnswer){
      clearInterval(this.intervalId);
      this.setState({
          scores : this.state.scores + 1,
          canAnswer: false,
          canClickControl: [true, true, true],
          currentWinnings: winnings[0].currentWinnings[this.state.scores],
          guaranteedWinnings: winnings[0].guaranteedWinnings[this.state.scores]
      });
      this.setText('Prawidłowa odpowiedź! Grasz dalej?');

    } else {
        this.finishGame('Nieprawidłowa odpowiedź!');
    }
  }

  componentWillUnmount(){
      clearInterval(this.intervalId);
  }


  //Lifelines

  handleAddExtraTime = () => {
    const canUseLifelines = this.state.canUseLifelines;
    canUseLifelines[0] = false;
    this.setState({
        secsLeft: this.state.secsLeft + 30,
    });
  }

  handleFiftyFifty = () => {
    const canUseLifelines = this.state.canUseLifelines;
    canUseLifelines[1] = false;
    //Convert NodeList to Array
    const allBtns = [...document.querySelectorAll('.answerBtn')]
    console.log(allBtns);
    console.log(this.state.correctAnswer);
    const incorrectBtns = allBtns.filter( btn => btn.innerText.indexOf(this.state.correctAnswer) < 0)
    this.shuffle(incorrectBtns)
    for (let i = 0; i < 2; i++) {
      incorrectBtns[i].disabled = true;
    }
  }

  handleChangeQuestion = () => {
    const canUseLifelines = this.state.canUseLifelines;
    canUseLifelines[2] = false;
    this.getQuestion();
  }

  handleVoting = () => {
    const canUseLifelines = this.state.canUseLifelines;
    canUseLifelines[3] = false;

  }




  render() {
    return (
    <div className = 'container'>
      <h1>{this.state.text}</h1>
      <Question question = {this.state.question} />
      <Answers
        shuffledAnswers = {this.state.shuffledAnswers}
        canAnswer = {this.state.canAnswer}
        onMyClick = {this.handleAnsSelect}
      />
      <Lifelines
        canUseLifelines = {this.state.canUseLifelines}
        onMyClickAddExtraTime = {this.handleAddExtraTime}
        onMyClickFiftyFifty = {this.handleFiftyFifty}
        onMyClickChangeQuestion = {this.handleChangeQuestion}
        onMyClickVoting = {this.handleVoting}
      />
      <CurrentScore currentScore = {this.state.scores} />
      <Timer time = {this.state.secsLeft} />
      <button onClick = {this.startGame} disabled = {!this.state.canClickControl[0]}>START NEW GAME</button>
      <button onClick = {this.nextRound} disabled = {!this.state.canClickControl[1]}>NEXT QUESTION</button>
      <button disabled = {!this.state.canClickControl[2]}>RESIGN</button>
      <h2>Current winnings: {this.state.currentWinnings} </h2>
      <h2>Guaranteed winnings: {this.state.guaranteedWinnings}</h2>
    </div>
  )
  }
}


 module.exports = Game;
