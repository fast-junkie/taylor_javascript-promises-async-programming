import {
  timeout, interval, clearIntervalChain, xhr, allPromises, allSettled, race,
} from '../src/module/creating.mjs';

window.timeout = timeout;
window.interval = interval;
window.clearIntervalChain = clearIntervalChain;
window.xhr = xhr;
window.allPromises = allPromises;
window.allSettled = allSettled;
window.race = race;
