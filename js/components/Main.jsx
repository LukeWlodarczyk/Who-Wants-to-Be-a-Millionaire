import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Header.jsx'

export default class Main extends React.Component {


  componentDidMount(){
    const config = {
      apiKey: "AIzaSyDDwby-Yr6BFMhaIV7RooPj2I7PV0YxTQs",
      databaseURL: "https://who-wants-to-be-a-millionaire1.firebaseio.com",
    };
    firebase.initializeApp(config);
    document.querySelector('#mainTheme').volume = 0.05;
    document.querySelector('#gameSounds').volume = 0.05;
  }

  render() {
    return <div className = 'container'>
      <Header/>
      { this.props.children }
      <audio id='gameSounds' src="./sounds/lets_play.mp3"></audio>
      <audio id='mainTheme' src="./sounds/main_theme.mp3" loop autoPlay></audio>
    </div>
  }
}
