import React from 'react';


class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      seconds: 30,
      timer: '00:30',
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      seconds: nextProps.time,
      timer: this.countdown(),
    });
  }

  countdown = () => {
    const minutes = `${Math.floor(this.state.seconds / 60)}`.padStart(2, '0');
    const seconds = `${this.state.seconds % 60}`.padStart(2, '0');
    return `${minutes}:${seconds}`
  }


    render() {


        return <div className = 'container'>
          <p>{this.state.timer}</p>
        </div>
      }
}


 module.exports = Timer;
