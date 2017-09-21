import React from 'react';
import data from './data.jsx'

class Answers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentScore: this.props.currentScore,
    }

  }


  currentMoney = score => {
      const lis = [...document.querySelectorAll('li')].reverse();
      if(score > 0) {
        lis[score-1].style.color = 'black';
      }
      lis[score].style.color = 'red';

  }




  componentWillReceiveProps(nextProps) {
    if(nextProps.currentScore !== this.props.currentScore) {
      this.setState({
        currentScore: nextProps.currentScore
      });
    }
    this.currentMoney(this.state.currentScore)
  }


  render() {
    const winningsLi = data[0].currentWinnings.slice(0).reverse().map( win => <li key = {win} >{win}</li>)
      return <div className = 'container'>
        <ul>
          {winningsLi}
        </ul>
      </div>
    }
}


 module.exports = Answers;
