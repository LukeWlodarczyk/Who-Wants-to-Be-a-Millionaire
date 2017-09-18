import React from 'react';
import MenuButton from './MenuButton.jsx'
import Game from '../gameComponents/Game.jsx';
import BestScores from '../bestScoresComponents/BestScores.jsx';
import {
  Link,
  IndexLink
} from 'react-router';

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quote: '',
      loading: true
    }
  }


    render() {
        return <div className = 'container'>
          <MenuButton source = '/game' text = 'Start' />
          <MenuButton source = '/bestscores' text = 'Best scores' />
        </div>
      }
}


 module.exports = Menu;
