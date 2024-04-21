const save = (key, value) => {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.error('Set state error: ', error.message);
  }
};

const load = key => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
};

const remove = key => {
  try {
    const serializedState = localStorage.removeItem(key);
    return serializedState === null
      ? undefined
      : JSON.stringify(serializedState);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
};

var _ = require('lodash');

import Player from '@vimeo/player';

const iframe = document.querySelector('iframe');
console.log(iframe);

const player = new Player(iframe);
console.log(player);

let stopTime = 0;

const registerTimeInMilliseconds = 1000;

const onPlay = function () {
  //   console.log('played the video!');
  player
    .getCurrentTime()
    .then(function (seconds) {
      // seconds = the current playback position
      let currentTime = seconds;
      //   console.log(stopTime);
      localStorage.clear();
      save('videoplayer-current-time', currentTime);
    })
    .catch(function (error) {
      // an error occurred
      console.log('error');
    });
};

player.on('timeupdate', _.throttle(onPlay, registerTimeInMilliseconds));
// onPlay();

const localStorageTime = load('videoplayer-current-time');
// console.log(localStorageTime);

player.setCurrentTime(localStorageTime);
