import config from './config.mjs';
import setText, { appendText, showWaiting, hideWaiting } from './results.mjs';

export function get() {
  axios
    .get(`${config.host}:${config.port}/orders/1`)
    .then(({ data }) => {
      setText(JSON.stringify(data));
      fj.app.debug('data', data);
    });
}

export function getCatch() {
  axios
    .get(`${config.host}:${config.port}/orders/123`)
    .then((result) => {
      setText(JSON.stringify(result.data));
    })
    .catch((reason) => {
      setText(reason);
    });
}

export function chain() {
  axios
    .get(`${config.host}:${config.port}/orders/1`)
    .then(({ data }) => axios.get(`${config.host}:${config.port}/addresses/${data.shippingAddress}`))
    .then(({ data }) => {
      setText(`City: ${data.city}`);
    });
}

export function chainCatch() {
  axios
    .get(`${config.host}:${config.port}/orders/1`)
    .then(({ data }) => axios.get(`${config.host}:${config.port}/addresses/${data.shippingAddress}`))
    .then(({ data }) => {
      setText(`City: ${data.fj.city}`);
    })
    .catch((reason) => {
      setText(reason);
    });
}

export function final() {
  showWaiting();
  axios
    .get(`${config.host}:${config.port}/orders/1`)
    .then(({ data }) => axios.get(`${config.host}:${config.port}/addresses/${data.shippingAddress}`))
    .then(({ data }) => {
      setText(`City: ${data.city}`);
    })
    .catch((reason) => {
      setText(reason);
    })
    .finally(() => {
      setTimeout(() => {
        hideWaiting();
        appendText(' | Completed...');
      }, 15e2);
    });
}
