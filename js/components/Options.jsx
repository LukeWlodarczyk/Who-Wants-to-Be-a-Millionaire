import React from 'react';


class Options extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mainThemeVol: 0.7,
      gameSoundsVol: 0.7,
    }
  }

  onChangeThemeVol = event => {
    this.setState({
      mainThemeVol: event.target.value
    })
    document.querySelector('#mainTheme').volume = event.target.value
  }

  onChangeGameSoundsVol = event => {
    this.setState({
      gameSoundsVol: event.target.value
    })
    document.querySelector('#gameSounds').volume = event.target.value
  }





  render() {
      return <div className = 'container'>
        <h1>Options</h1>
          Music:
          <input type="range" value={this.state.mainThemeVol} max="1" min="0" step="any" onChange={this.onChangeThemeVol}/>
          Game sounds:
          <input type="range" value={this.state.gameSoundsVol} max="1" min="0" step="any" onChange={this.onChangeGameSoundsVol}/>
      </div>
    }
}


 module.exports = Options;
