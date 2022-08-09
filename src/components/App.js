import React from 'react';

// import css file
import '../css/App.css';
// Import iPod body file
import Case from './Case.js';
import KnowMore from './KnowMore.js';
// Import songs
import song1 from '../static/songs/Kate bush Running up that hill.mp3';
import song2 from '../static/songs/1D What Makes You Beautiful.mp3';
import song3 from '../static/songs/Charlie Puth Attention.mp3';
import song4 from '../static/songs/Dua Lipa New Rules.mp3';
import song5 from '../static/songs/ZAYN Dusk Till Dawn.mp3';

// Import song cover images
import song1Img from '../static/Kate bush Running up that hill.jpeg';
import song2Img from '../static/1D What Makes You Beautiful.jpeg';
import song3Img from '../static/Charlie Puth Attention.jpeg';
import song4Img from '../static/Dua Lipa New Rules.jpeg';
import song5Img from '../static/ZAYN Dusk Till Dawn.jpeg';

// Import wallpaper
import Ocean from '../static/Ocean.jpeg';
import Trees from '../static/Trees.jpeg';
import Mist from '../static/Mist.jpeg';
import Mountain from '../static/Mountain.jpeg';
import Tower from '../static/Tower.jpeg';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      active: 0, //Active list item
      menuItems: ['Now Playing', 'Music', 'Games', 'Settings'], //menu Items
      musicItems: ['All Songs', 'Artist', 'Albums'], //Items in music
      songItemsUrl: [song1, song2, song3, song4, song5], //songs list
      songImgItemsUrl: [song1Img, song2Img, song3Img, song4Img, song5Img], //song images list
      wallpaperItems: [Trees, Mountain, Tower, Ocean, Mist], //wallpapers
      songItems: [
        'Kate bush Running up that hill',
        '1D What Makes You Beautiful',
        'Charlie Puth Attention',
        'Dua Lipa New Rules',
        'ZAYN Dusk Till Dawn',
      ], //song names
      songIndex: 0, //current song
      lengthMenuKey: { '-1': 3, 1: 2, 4: 4, 8: 5, 3: 2, 9: 4, 10: 4 }, //length of a particular menu
      menuMapping: { '-1': [0, 1, 2, 3], 1: [4, 5, 6], 3: [8, 9, 10] }, //which menu can be rendered by key menu
      currentMenu: -2, //current menu which is lockscreen initially
      navigationStack: [], //Used for navigation forward and backward
      songUrl: song1, //current song url
      playing: false, //playing or not
      theme: 'rgb(210, 210, 210)', //current body theme
      audio: new Audio(song1), //current audio file
      songImgUrl: song1Img, //current song img for now playing
      wheelColor: 'white', //current wheel color
      wallpaper: 0, //current wallpaper
      noty: false, // has to show notification or not
      notifyText: 'Wallpaper Changed', //notification text
    };
  }

  // function for : on long press of forward button tracks are seeked forward
  seekSongForward = (e) => {
    if (this.state.currentMenu === -2) {
      return;
    }
    if (this.state.playing === false) {
      return;
    }
    if (e.detail.interval < 250) {
      this.state.audio.pause();
      let songIndex = this.state.songIndex;
      if (songIndex === this.state.songItemsUrl.length - 1) {
        songIndex = 0;
      } else {
        songIndex++;
      }
      const songUrl = this.state.songItemsUrl[songIndex];
      const songImgUrl = this.state.songImgItemsUrl[songIndex];
      this.setState(
        {
          songIndex: songIndex,
          songImgUrl: songImgUrl,
          songUrl: songUrl,
          audio: new Audio(songUrl),
        },
        () => {
          this.state.audio.play();
        }
      );
    } else if (e.detail.interval > 250 && e.detail.interval < 10000) {
      const interval = e.detail.interval / 100;
      this.setState((prevState) => {
        prevState.audio.currentTime += interval;
        return prevState;
      });
    }
  };

  // function for : on long press of forward button tracks are seeked backward
  seekSongReverse = (e) => {
    if (this.state.currentMenu === -2) {
      return;
    }
    if (this.state.playing === false) {
      return;
    }
    console.log(e.detail.interval);
    if (e.detail.interval < 250) {
      this.state.audio.pause();
      let songIndex = this.state.songIndex;
      if (songIndex === 0) {
        songIndex = this.state.songItemsUrl.length - 1;
      } else {
        songIndex--;
      }
      const songUrl = this.state.songItemsUrl[songIndex];
      const songImgUrl = this.state.songImgItemsUrl[songIndex];
      this.setState(
        {
          songIndex: songIndex,
          songImgUrl: songImgUrl,
          songUrl: songUrl,
          audio: new Audio(songUrl),
        },
        () => {
          this.state.audio.play();
        }
      );
    } else if (e.detail.interval > 250 && e.detail.interval < 10000) {
      const interval = e.detail.interval / 100;
      this.setState((prevState) => {
        prevState.audio.currentTime -= interval;
        return prevState;
      });
    }
  };

  // function for : toggle song play and pause
  togglePlayPause = () => {
    if (this.state.currentMenu === -2) {
      return;
    }
    if (this.state.playing === true) {
      this.setState({ playing: false });
      this.state.audio.pause();
    } else {
      this.setState({ playing: true });
      this.state.audio.play();
    }
  };

  // function for : update active menu while rotating on the track-wheel
  updateActiveMenu = (direction, menu) => {
    if (
      menu !== -1 &&
      menu !== 1 &&
      menu !== 4 &&
      menu !== 8 &&
      menu !== 3 &&
      menu !== 9 &&
      menu !== 10
    ) {
      return;
    }
    let min = 0;
    let max = 0;

    max = this.state.lengthMenuKey[menu];

    if (direction === 1) {
      if (this.state.active >= max) {
        this.setState({ active: min });
      } else {
        this.setState({ active: this.state.active + 1 });
      }
    } else {
      if (this.state.active <= min) {
        this.setState({ active: max });
      } else {
        this.setState({ active: this.state.active - 1 });
      }
    }
  };

  // function for : change the theme of ipod body
  setTheme = (id) => {
    let theme = '';
    if (id === 0) {
      theme = '#60076f';
    } else if (id === 1) {
      theme = 'rgb(210, 210, 210)';
    } else if (id === 2) {
      theme = '#F5DDC5';
    } else if (id === 3) {
      theme = '#D1CDDA';
    } else if (id === 4) {
      theme = 'black';
    } else if (id === 5) {
      theme = '#FDDCD7';
    }
    this.setState({ theme: theme, noty: true, notifyText: 'Theme Changed' });
    return;
  };

  // function for : change color of wheel
  setWheelColor = (id) => {
    let wheelColor = '';
    if (id === 0) {
      wheelColor = '#212121';
    } else if (id === 1) {
      wheelColor = 'white';
    } else if (id === 2) {
      wheelColor = '#3E2723';
    } else if (id === 3) {
      wheelColor = '#3D5AFE';
    } else if (id === 4) {
      wheelColor = 'rgba(112, 182, 115, 1)';
    }

    this.setState({
      wheelColor: wheelColor,
      noty: true,
      notifyText: 'Wheel Color Changed',
    });
    return;
  };

  // function for : set wallpaper of ipod body
  setWallpaper = (id) => {
    this.setState({
      wallpaper: id,
      noty: true,
      notifyText: 'Wallpaper Changed',
    });
    return;
  };

  // function for : change playing music
  chagePlayingSongFromMusicMenu = (id, navigationStack) => {
    const songUrl = this.state.songItemsUrl[id];
    const songImgUrl = this.state.songImgItemsUrl[id];
    this.state.audio.pause();
    this.setState(
      {
        currentMenu: 7,
        songUrl: songUrl,
        navigationStack: navigationStack,
        active: 0,
        playing: true,
        songIndex: id,
        audio: new Audio(songUrl),
        songImgUrl: songImgUrl,
      },
      () => {
        this.state.audio.play();
      }
    );
    return;
  };

  // function for : change menu backwards on press of center button
  changeMenuBackward = () => {
    const navigationStack = this.state.navigationStack.slice();
    if (this.state.currentMenu === -2) {
      return;
    } else {
      const prevId = navigationStack.pop();
      this.setState({
        currentMenu: prevId,
        navigationStack: navigationStack,
        active: 0,
      });
      return;
    }
  };

  // function for : change menu forward on press of center button using navigation stack
  changeMenuForward = (id, fromMenu) => {
    const navigationStack = this.state.navigationStack.slice();

    if (
      fromMenu !== -2 &&
      fromMenu !== -1 &&
      fromMenu !== 1 &&
      fromMenu !== 4 &&
      fromMenu !== 3 &&
      fromMenu !== 8 &&
      fromMenu !== 9 &&
      fromMenu !== 0 &&
      fromMenu !== 7 &&
      fromMenu !== 10
    ) {
      return;
    }

    if (fromMenu === -2) {
      navigationStack.push(this.state.currentMenu);
      this.setState({
        currentMenu: -1,
        navigationStack: navigationStack,
        active: 0,
      });
      return;
    }

    if (fromMenu === -1) {
      navigationStack.push(this.state.currentMenu);
      this.setState({
        currentMenu: id,
        navigationStack: navigationStack,
        active: 0,
      });
      return;
    }

    if (fromMenu === 7 || fromMenu === 0) {
      this.togglePlayPause();
      return;
    }

    if (fromMenu === 8) {
      this.setTheme(id);
      return;
    }

    if (fromMenu === 9) {
      this.setWheelColor(id);
      return;
    }

    if (fromMenu === 10) {
      this.setWallpaper(id);
      return;
    }

    navigationStack.push(this.state.currentMenu);

    if (fromMenu === 4) {
      this.chagePlayingSongFromMusicMenu(id, navigationStack, fromMenu);
      return;
    }

    const currentMenuID = this.state.menuMapping[fromMenu][id];
    this.setState({
      currentMenu: currentMenuID,
      navigationStack: navigationStack,
      active: 0,
    });
  };

  // function for : set notification as false after sending notification
  setNoty = () => {
    this.setState({ noty: false });
    return;
  };

  render() {
    const {
      audio,
      active,
      currentMenu,
      menuItems,
      musicItems,
      songItems,
      playing,
      songIndex,
      theme,
      songUrl,
      songImgUrl,
      wheelColor,
      wallpaper,
      wallpaperItems,
      noty,
      notifyText,
    } = this.state;
    return (
      <div className='App'>
        <KnowMore />
        <Case
          songIndex={songIndex}
          active={active}
          menuItems={menuItems}
          musicItems={musicItems}
          currentMenu={currentMenu}
          changeMenuForward={this.changeMenuForward}
          changeMenuBackward={this.changeMenuBackward}
          updateActiveMenu={this.updateActiveMenu}
          togglePlayPause={this.togglePlayPause}
          songItems={songItems}
          playing={playing}
          theme={theme}
          audio={audio}
          songUrl={songUrl}
          songImgUrl={songImgUrl}
          seekSongForward={this.seekSongForward}
          seekSongReverse={this.seekSongReverse}
          wheelColor={wheelColor}
          wallpaper={wallpaper}
          wallpaperItems={wallpaperItems}
          noty={noty}
          setNoty={this.setNoty}
          notifyText={notifyText}
        />
      </div>
    );
  }
}

export default App;
