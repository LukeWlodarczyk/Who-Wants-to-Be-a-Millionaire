import React from 'react';


class Options extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mainThemeVol: 1,
      gameSoundsVol: 1,
    }
  }

  onChangeThemeVol = event => {
    this.setState({
      mainThemeVol: event.target.value
    })
    document.querySelector('#mainTheme').volume = this.state.mainThemeVol
  }

  onChangeGameSoundsVol = event => {
    this.setState({
      gameSoundsVol: event.target.value
    })
    document.querySelector('#gameSounds').volume = this.state.gameSoundsVol;
    document.querySelector('#gameSounds').play();
  }

  componentDidMount() {
    this.setState({
      mainThemeVol: document.querySelector('#mainTheme').volume,
      gameSoundsVol: document.querySelector('#gameSounds').volume,
    })
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
