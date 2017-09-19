import React from 'react';


class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: this.props.time,
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      time: nextProps.time,
    });
  }


    render() {
        return <div className = 'container'>
          <p>{this.state.time}</p>
        </div>
      }
}


 module.exports = Timer;
