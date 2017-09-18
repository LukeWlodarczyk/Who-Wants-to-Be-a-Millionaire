import React from 'react';


class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quote: '',
      loading: true
    }
  }


    render() {
        return <div className = 'container'>
          <h1>Game</h1>
        </div>
      }
}


 module.exports = Game;
