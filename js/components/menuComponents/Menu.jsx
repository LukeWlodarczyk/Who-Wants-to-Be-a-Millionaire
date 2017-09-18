import React from 'react';
import MenuButton from './MenuButton.jsx'

class Menu extends React.Component {

    render() {
        return <div className = 'container'>
          <MenuButton source = '/game' text = 'Start' />
          <MenuButton source = '/bestscores' text = 'Best scores' />
        </div>
      }
}


 module.exports = Menu;
