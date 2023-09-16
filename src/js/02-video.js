import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const LS_KEY = 'videoplayer-current-time';

const playerRef = document.querySelector('#vimeo-player');
const player = new Player(playerRef);

function setItemLS(data) {
  localStorage.setItem(LS_KEY, JSON.stringify(data));
}

player.on('timeupdate', throttle(setItemLS, 1000));

const lsUserTime = JSON.parse(localStorage.getItem(LS_KEY));

player
  .setCurrentTime(lsUserTime.seconds)
  //   .then(function (seconds) {})
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        break;

      default:
        break;
    }
  });
