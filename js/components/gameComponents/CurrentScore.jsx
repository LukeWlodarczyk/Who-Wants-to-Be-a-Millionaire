import React from 'react';
import data from './data.js'

export default class CurrentScore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentScore: this.props.currentScore,
    }

  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.currentScore !== this.props.currentScore) {
      this.setState({
        currentScore: nextProps.currentScore,
      });
    }
    const hl = document.querySelector('.currentWinnings');
    hl.style.transform = `translate(0, ${this.state.currentScore * -30}px)`
  }


  render() {
    const winningsLi = data.currentWinnings.slice(0).reverse().map( win => <li key = {win} >{win}&pound;</li>)
      return <div className = ''>
        <ul className='currentScore'>
          {winningsLi}
          <li className='currentWinnings'></li>
        </ul>
      </div>
    }
}
