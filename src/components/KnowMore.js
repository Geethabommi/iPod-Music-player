import React from 'react';
import '../css/KnowMore.css';

// Renders themes menu
class KnowMore extends React.Component {
  constructor() {
    super();
    this.state = {
      divOpen: false,
    };
  }

  openDiv = () => {
    if (this.state.divOpen === true) this.setState({ divOpen: false });
    else this.setState({ divOpen: true });
  };
  render() {
    const { divOpen } = this.state;
    let cssProp;
    if (divOpen === false) {
      cssProp = { top: '-410px' };
    } else {
      cssProp = { top: '0px' };
    }
    return (
      <div style={cssProp} className='information-container'>
        <div className='info-div'>
          <h3>Help</h3>
          <p>
            1. To unlock screen, press center button and to lock screen,press
            menu button in main menu.
          </p>
          <p>2. To navigate between menu items,rotate on track wheel</p>
          <p>3. To play and pause music, press play/pause button on bottom. </p>
          <p>
            4. Short pressing on forward/reverse will take you to next/previous
            track only when playing{' '}
          </p>
          <p>
            5. Long pressing on forward/reverse will seek the song in
            forward/reverse only when playing{' '}
          </p>
          <p>
            6. To go to next menu or go inside a menu press center button and to
            go to previous menu press menu button
          </p>
          <p>
            7. Please checkout settings menu for Theme,wallpaper and color
            change
          </p>
        </div>
        <button id='info-btn' onClick={this.openDiv}>
          Help
        </button>
      </div>
    );
  }
}

export default KnowMore;
