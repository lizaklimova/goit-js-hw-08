import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const LS_KEY = 'videoplayer-current-time';

const playerRef = document.querySelector('#vimeo-player');
const player = new Player(playerRef);

function setItemLS({ seconds }) {
  localStorage.setItem(LS_KEY, seconds);
}

player.on('timeupdate', throttle(setItemLS, 1000));

const lsUserTime = localStorage.getItem(LS_KEY) || 0;

player.setCurrentTime(lsUserTime).catch(function (error) {
  switch (error.name) {
    case 'RangeError':
      break;

    default:
      break;
  }
});
