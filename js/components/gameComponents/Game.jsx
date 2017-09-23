import React from 'react';
import Question from './Question.jsx'
import Answers from './Answers.jsx'
import Timer from './Timer.jsx'
import CurrentScore from './CurrentScore.jsx'
import Lifelines from './Lifelines.jsx'
import Voting from './Voting.jsx'
import data from './data.jsx'

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: '',
      idxCorrAns: null,
      correctAnswer: '',
      allAnswers: [],
      loading: true,
      votingVis: 'hidden',
      canAnswer: [false, false, false, false],
      canType: true,
      dChanceActiv: false,
      text: 'Who wants to be a millionaire?',
      scores: 0,
      secsLeft: 30,
      canUseLifelines: [false, false, false, false, false],
      lifelinesStatus: [true, true, true, true, true],
      canClickControl: [true, false, false],
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

  htmlDecode = input => {
    const e = document.createElement('div');
    e.innerHTML = input;
    return e.childNodes[0].nodeValue;
  }

  insertQuestion = data => {
    const incorrectAnswer = data.results[0].incorrect_answers;
    const correctAnswer = this.htmlDecode(data.results[0].correct_answer);
    const allAnswers = this.shuffle(incorrectAnswer.concat(correctAnswer));
    const idxCorrAns = allAnswers.indexOf(correctAnswer);
    this.setState({
      question: data.results[0].question,
      correctAnswer: correctAnswer,
      idxCorrAns: idxCorrAns,
      canAnswer: [true, true, true, true],
      allAnswers: allAnswers,
      loading: false,
    });
    console.log('Correct answer: ', this.state.correctAnswer);
    console.log('Index correct answer: ', this.state.idxCorrAns);
  }

  getQuestion = () => {
    console.log(data[0].difficulty[this.state.scores]);
    const baseUrl = `https://opentdb.com/api.php?amount=1&difficulty=${data[0].difficulty[this.state.scores]}&type=multiple`;
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


  prepareQuestion = status => {
    this.getQuestion();
    this.setState({
      canUseLifelines: status,
      lifelinesStatus: status,
      canAnswer: [true, true, true, true],
      canClickControl: [true, false, false],
      secsLeft: 30 + this.state.secsLeft,
    });
  }

  finishGame = text => {
      clearInterval(this.intervalId);
      this.setState({
        canUseLifelines: [false, false, false, false, false],
        canClickControl: [true, false, false],
        canAnswer: [false, false, false, false],
        canType: true,
        text: text,
      });


  }


  startGame = () => {
    //Clear inteval in case multiple click on Start Game button
    clearInterval(this.intervalId);
    this.exitVotingResult();
    this.prepareQuestion([true, true, true, true, true]);
    this.setState({
      text: 'Who wants to be a millionaire?',
      canType: false,
      scores: 0,
      currentWinnings: 0,
      guaranteedWinnings: 0,
      secsLeft: 30,
      canUseLifelines: [true, true, true, true, true],
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
    this.exitVotingResult();
    this.prepareQuestion(this.state.lifelinesStatus);
    this.setText('Świetnie! Do dzieła! Oto pytanie')
    this.intervalId = setInterval(this.timer.bind(), 1000);
  }

  setText = text => {
    this.setState({
      text: text,
    });
  }

  hightlightCorrectAns = () => {
    const allBtns = [...document.querySelectorAll('.answerBtn')];
    const correctBtn = allBtns.filter( btn => btn.innerText.indexOf(this.state.correctAnswer) > 0)[0];
    console.log(correctBtn);
    correctBtn.style.color = 'green';
  }

  hightlightSelectedAns = answer => {
    const allBtns = [...document.querySelectorAll('.answerBtn')];
    console.log(allBtns);
    const selectedBtn = allBtns.filter( btn => btn.innerText.indexOf(answer) > 0)[0];
    console.log(answer);
    console.log(selectedBtn);
    selectedBtn.style.color = 'red';
  }

  handleAnsSelect = answer => {

    const answerSel = this.htmlDecode(answer)
    if (answerSel === this.state.correctAnswer){
      clearInterval(this.intervalId);
      this.hightlightCorrectAns()
      this.setState({
        votingVis: 'hidden',
        scores : this.state.scores + 1,
        canAnswer: [false, false, false, false],
        canClickControl: [true, true, true],
        canUseLifelines: [false, false, false, false, false],
        currentWinnings: data[0].currentWinnings[this.state.scores],
        guaranteedWinnings: data[0].guaranteedWinnings[this.state.scores]
      });

      if(this.state.scores === 14){
        this.setText("Congratulations! You've just won a million dollars!")
      } else {
        this.setText('Prawidłowa odpowiedź! Grasz dalej?');
      }

    } else {
        if(this.state.dChanceActiv === true) {
          this.hightlightSelectedAns(answerSel);
          this.setState({
            dChanceActiv: false,
          })
        } else {
          this.hightlightCorrectAns()
          this.hightlightSelectedAns(answerSel);
          this.finishGame('Nieprawidłowa odpowiedź!');
        }
    }
  }

  resign = () => {
    console.log(this.state.currentWinnings,);
    this.setState({
      canType: true,
    })
  }

  componentWillUnmount(){
      clearInterval(this.intervalId);
  }


  //Lifelines

  handleAddExtraTime = () => {
    const lifelinesStatus = this.state.lifelinesStatus;
    lifelinesStatus[0] = false;
    this.state.canUseLifelines = this.state.lifelinesStatus;

    this.setState({
        secsLeft: this.state.secsLeft + 30,
    });
  }

  handleFiftyFifty = () => {
    const lifelinesStatus = this.state.lifelinesStatus;
    lifelinesStatus[1] = false;
    this.state.canUseLifelines = this.state.lifelinesStatus;
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
    const lifelinesStatus = this.state.lifelinesStatus;
    lifelinesStatus[2] = false;
    this.state.canUseLifelines = this.state.lifelinesStatus;
    this.getQuestion();
  }


  handleVoting = () => {
    // const lifelinesStatus = this.state.lifelinesStatus;
    // lifelinesStatus[3] = false;
    // this.state.canUseLifelines = this.state.lifelinesStatus;
    const votingReults =document.querySelector('.votingResults')
    const votingResultAll = document.querySelectorAll('.votingResult');
    votingResultAll.forEach( r => r.style.visibility = 'visible')
    votingReults.style.visibility = 'visible';
    const max = 100;
    const r1 = this.randombetween(1, max-3);
    const r2 = this.randombetween(1, max-2-r1);
    const r3 = this.randombetween(1, max-1-r1-r2);
    const r4 = max - r1 - r2 - r3;
    const rndNums = [r1, r2, r3, r4];
    const maxNum = Math.max(r1, r2, r3, r4);
    const maxNumIdx = rndNums.indexOf(maxNum)

    const idxMaxVal = rndNums.reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0);
    const idxSecMaxVal = rndNums.reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0);

    if(this.randombetween(0, this.state.scores) === 0) {
      const tmp = rndNums[idxMaxVal];
      rndNums[idxMaxVal] = rndNums[this.state.idxCorrAns];
      rndNums[this.state.idxCorrAns] = tmp;
    }


    console.log(...rndNums);
    const percentDiagrams = document.querySelectorAll('.percentageDiagram')
    const percentages = document.querySelectorAll('.percentage');

    percentDiagrams[0].style.height = `${rndNums[0]}px`;
    percentDiagrams[1].style.height = `${rndNums[1]}px`;
    percentDiagrams[2].style.height = `${rndNums[2]}px`;
    percentDiagrams[3].style.height = `${rndNums[3]}px`;

    let counter0 = 0;
    let counter1 = 0;
    let counter2 = 0;
    let counter3 = 0;

    this.setTimer0 = setInterval( () => {
      percentages[0].innerText = `${counter0}%`;

      if (counter0 === rndNums[0]) {
        clearInterval(this.setTimer0)
      }

      counter0++;

    },2500/rndNums[0],(0));

    this.setTimer1 = setInterval( () => {
      percentages[1].innerText = `${counter1}%`;

      if (counter1 === rndNums[1]) {
        clearInterval(this.setTimer1)
      }

      counter1++;

    },2500/rndNums[1],(1));

    this.setTimer2 = setInterval( () => {
      percentages[2].innerText = `${counter2}%`;

      if (counter2 === rndNums[2]) {
        clearInterval(this.setTimer2)
      }

      counter2++;

    },2500/rndNums[2],(2));

    this.setTimer3 = setInterval( () => {
      percentages[3].innerText = `${counter3}%`;

      if (counter3 === rndNums[3]) {
        clearInterval(this.setTimer3)
      }

      counter3++;

    },2500/rndNums[3],);



  }

  handleDoubleChance = () => {
    const lifelinesStatus = this.state.lifelinesStatus;
    lifelinesStatus[4] = false;
    this.state.canUseLifelines = this.state.lifelinesStatus;
    this.setState({
      dChanceActiv: true,
    })
  }



  randombetween = (min, max) => {
    return Math.floor(Math.random()*(max-min)+min);
  }

  exitVotingResult = () => {
    const votingReults = document.querySelector('.votingResults');
    const votingResultAll = document.querySelectorAll('.votingResult');
    const percentages = document.querySelectorAll('.percentage');
    const percentDiagrams = document.querySelectorAll('.percentageDiagram')
    votingReults.style.visibility = 'hidden';
    votingResultAll.forEach( r => r.style.visibility = 'hidden')
    percentages.forEach( p => p.innerText = '0%')
    percentDiagrams.forEach( d => d.style.height = '0px');
  }



  render() {
    return (
    <div className = 'container'>
      <h1>{this.state.text}</h1>
      <Question question = {this.state.question} />
      <Answers
        allAnswers = {this.state.allAnswers}
        canAnswer = {this.state.canAnswer}
        onMyClick = {this.handleAnsSelect}
        shuffle = {this.shuffle}
      />
      <Lifelines
        canUseLifelines = {this.state.canUseLifelines}
        onMyClickAddExtraTime = {this.handleAddExtraTime}
        onMyClickFiftyFifty = {this.handleFiftyFifty}
        onMyClickChangeQuestion = {this.handleChangeQuestion}
        onMyClickVoting = {this.handleVoting}
        onMyClickDoubleChance = {this.handleDoubleChance}
      />
      <CurrentScore currentScore = {this.state.scores} />
      <Timer time = {this.state.secsLeft} />
      <label>NAME:
        <input type = 'text' disabled = {!this.state.canType}></input>
      </label>
      <button onClick = {this.startGame} disabled = {!this.state.canClickControl[0]}>START NEW GAME</button>
      <button onClick = {this.nextRound} disabled = {!this.state.canClickControl[1]}>NEXT QUESTION</button>
      <button onClick = {this.resign} disabled = {!this.state.canClickControl[2]}>RESIGN</button>
      <h2>Current winnings: {this.state.currentWinnings} </h2>
      <h2>Guaranteed winnings: {this.state.guaranteedWinnings}</h2>
      <Voting onMyClickExit = {this.exitVotingResult}/>
    </div>
  )
  }
}


 module.exports = Game;
