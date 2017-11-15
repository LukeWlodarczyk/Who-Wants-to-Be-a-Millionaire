import React from 'react';
import MenuButton from './MenuButton.jsx'

export default class Menu extends React.Component {

    render() {
        return <div className = 'container menuContainer'>
          <MenuButton source = '/game' text = 'Start' />
          <MenuButton source = '/bestscores' text = 'Best scores' />
          <MenuButton source = '/options' text = 'Options' />
        </div>
      }
}
