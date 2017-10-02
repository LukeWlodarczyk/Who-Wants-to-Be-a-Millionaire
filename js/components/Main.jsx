import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Header.jsx'
import Footer from './Footer.jsx'

class Main extends React.Component {


  componentWillMount(){
    const config = {
      apiKey: "AIzaSyDDwby-Yr6BFMhaIV7RooPj2I7PV0YxTQs",
      databaseURL: "https://who-wants-to-be-a-millionaire1.firebaseio.com",
    };
    firebase.initializeApp(config);
  }

  render() {
    return <div className = 'container'>
      <Header/>
      { this.props.children }
      <Footer/>
    </div>
  }
}

module.exports = Main;
