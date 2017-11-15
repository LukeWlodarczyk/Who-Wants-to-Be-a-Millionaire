import React from 'react';
import {
  Link,
  IndexLink
} from 'react-router';

export default class Header extends React.Component {
  render() {
    return <div>
      <header className='header'>
        <Link className='logo' to='/'>Who wants to be a millionaire?</Link>
      </header>
    </div>
  }
}
