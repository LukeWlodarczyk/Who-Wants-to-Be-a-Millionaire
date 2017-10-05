import React from 'react';
import MenuButton from './MenuButton.jsx'

class Menu extends React.Component {

    render() {
        return <div className = 'container'>
          <MenuButton source = '/game' text = 'Start' />
          <MenuButton source = '/bestscores' text = 'Best scores' />
          <MenuButton source = '/options' text = 'Options' />
          <MenuButton source = '/instruction' text = 'Instruction' />
        </div>
      }
}


 module.exports = Menu;
