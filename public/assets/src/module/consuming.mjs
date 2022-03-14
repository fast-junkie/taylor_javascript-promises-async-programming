import config from './config.mjs';
import setText, { appendText, showWaiting, hideWaiting } from './results.mjs';

export function get() {
  axios
    .get(`${config.host}:${config.port}/orders/1`)
    .then((data) => {
      setText(JSON.stringify(data));
      fj.app.debug('data', data);
    });
}

export function getCatch() {
}

export function chain() {
}

export function chainCatch() {
}

export function final() {
}
