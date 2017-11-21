import React from 'react';


export default class Winnings extends React.Component {

  render() {
      return <div className = 'winningsContainer'>
        <p className='winning'>Current winnings: {this.props.current}&pound; </p>
        <p className='winning'>Guaranteed winnings: {this.props.guaranteed}&pound; </p>
      </div>
    }
}
