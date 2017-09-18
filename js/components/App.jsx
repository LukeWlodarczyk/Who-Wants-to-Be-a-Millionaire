import React from 'react';
import ReactDOM from 'react-dom';
import Menu from './menuComponents/Menu.jsx';
import Game from './gameComponents/Game.jsx';
import BestScores from './bestScoresComponents/BestScores.jsx';
import Main from './Main.jsx';
import {
  Router,
  Route,
  Link,
  IndexLink,
  IndexRoute,
  hashHistory
} from 'react-router';

class App extends React.Component {

  render() {
    return <Router history={ hashHistory }>
      <Route path="/" component={ Main }>
        <IndexRoute component={ Menu }/>
        <Route path="/game" component={ Game }/>
        <Route path="/bestscores" component={ BestScores }/>
        <Route path="/menu" component={ Menu }/>
      </Route>


    </Router>;
  }
}

document.addEventListener('DOMContentLoaded', function() {

  ReactDOM.render(
    <App/>, document.querySelector('#app'));
});
