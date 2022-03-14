import config from './config.mjs';
import setText, { appendText } from './results.mjs';

export function timeout() {
  const wait = new Promise((resolve) => {
    setTimeout(() => {
      resolve('Time out complete...');
    }, 15e2);
  });
  wait.then((text) => setText(text));
}

export function interval() {
  let counter = 0;
  const wait = new Promise((resolve) => {
    setInterval(() => {
      resolve(`Interval complete... ${counter += 1}`);
      fj.app.debug('Interval', counter);
    }, 15e2);
  });
  wait
    .then((text) => setText(text))
    .finally(() => {
      appendText(` | finally... ${counter}`);
    });
}

export function clearIntervalChain() {
  let _interval;
  let counter = 0;
  const wait = new Promise((resolve) => {
    _interval = setInterval(() => {
      resolve(`Interval complete... ${counter += 1}`);
      fj.app.debug('Interval', counter);
    }, 15e2);
  });
  wait
    .then((text) => setText(text))
    .finally(() => {
      clearInterval(_interval);
      appendText(` | finally... ${counter}`);
    });
}

export function xhr() {
  const request = new Promise((resolve, reject) => {
    const _xhr = new XMLHttpRequest();
    _xhr.open('get', `${config.host}:${config.port}/users/7`);
    _xhr.onload = () => {
      if (_xhr.status === 200) {
        resolve(_xhr.responseText);
      } else {
        reject(_xhr.statusText);
      }
    };
    _xhr.onerror = () => reject(new Error('Request failed...'));
    _xhr.send();
  });
  request
    .then((result) => setText(result))
    .catch((reason) => setText(reason));
}

export function allPromises() {
  const categories = axios.get(`${config.host}:${config.port}/itemCategories`);
  const statuses = axios.get(`${config.host}:${config.port}/orderStatuses`);
  const userTypes = axios.get(`${config.host}:${config.port}/userTypes`);
  const addressTypes = axios.get(`${config.host}:${config.port}/addressTypes`);

  Promise
    .all([categories, statuses, userTypes, addressTypes])
    .then(([cat, stat, type, address]) => {
      setText('');
      appendText(JSON.stringify(cat.data));
      appendText(JSON.stringify(stat.data));
      appendText(JSON.stringify(type.data));
      appendText(JSON.stringify(address.data));
    })
    .catch((reasons) => {
      setText(reasons);
    });
}

export function allSettled() {
  const categories = axios.get(`${config.host}:${config.port}/itemCategories`);
  const statuses = axios.get(`${config.host}:${config.port}/orderStatuses`);
  const userTypes = axios.get(`${config.host}:${config.port}/userTypes`);
  const addressTypes = axios.get(`${config.host}:${config.port}/addressTypes`);

  Promise
    .allSettled([categories, statuses, userTypes, addressTypes])
    .then((values) => {
      const results = values.map((v) => {
        if (v.status === 'fulfilled') {
          return `Fulfilled... ${JSON.stringify(v.value.data[0])}`;
        }
        return `Rejected... ${v.reason.message}`;
      });
      setText(results);
    })
    .catch((reasons) => {
      setText(reasons);
    });
}

export function race() {
  const users = axios.get(`${config.host}:${config.port}/users`);
  const backupUsers = axios.get(`${config.host}:${config.port}/users`);
  Promise.race([users, backupUsers])
    .then((_users) => setText(JSON.stringify(_users.data)))
    .catch((reason) => setText(reason));
}
