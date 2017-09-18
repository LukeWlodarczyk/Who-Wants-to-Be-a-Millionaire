import React from 'react';
import {
  Link,
  IndexLink
} from 'react-router';

class RandomQuotes extends React.Component {

    render() {
        return <Link to={this.props.source} >{this.props.text}</Link>
      }
}


 module.exports = RandomQuotes;
