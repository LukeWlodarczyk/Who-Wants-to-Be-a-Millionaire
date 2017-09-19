import React from 'react';


class Answers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentScore: this.props.currentScore,
    }

  }


  currentMoney = score => {
    const lis = document.querySelectorAll('li');
    lis[score-1].style.color = 'red';
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
      return <div className = 'container'>
        <ul>
          <li>100</li>
          <li>500</li>
          <li>1000</li>
          <li>5000</li>
          <li>10000</li>
          <li>50000</li>
        </ul>
      </div>
    }
}


 module.exports = Answers;
