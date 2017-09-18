import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Header.jsx'
import Footer from './Footer.jsx'

class Main extends React.Component {

  render() {
    return <div className = 'container'>
      <Header/>
      { this.props.children }
      <Footer/>
    </div>
  }
}

module.exports = Main;
