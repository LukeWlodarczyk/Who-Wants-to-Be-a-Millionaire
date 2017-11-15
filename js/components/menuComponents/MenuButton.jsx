import React from 'react';
import {
  Link,
  IndexLink
} from 'react-router';

export default class MenuButton extends React.Component {

    render() {
        return <Link className='menuButton' to={this.props.source} >{this.props.text}</Link>
      }
}
