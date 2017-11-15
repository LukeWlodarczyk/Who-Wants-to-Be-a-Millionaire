import React from 'react';


export default class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: '00:00',
      hue: 120,
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      timer: `${Math.floor(nextProps.time / 60)}:`.padStart(3, '0') + `${nextProps.time % 60}`.padStart(2, '0'),
      hue: nextProps.time * 120 / nextProps.maxTime,
    });
  }



    render() {


        return <div className = ''>
          <p className='timer' style={{'color': `hsl(${this.state.hue}, 100%, 50%)`, 'borderColor': `hsl(${this.state.hue}, 100%, 50%)`}}>{this.state.timer}</p>
        </div>
      }
}
