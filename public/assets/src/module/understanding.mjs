import config from './config.mjs';
import setText from './results.mjs';

export function raceCondition() {
  const xhr = new XMLHttpRequest();
  let statuses = [];
  xhr.open('GET', `${config.host}:${config.port}/orderStatuses`);
  xhr.onload = () => {
    statuses = JSON.parse(xhr.responseText);
  };
  xhr.send();

  const xhr2 = new XMLHttpRequest();
  xhr2.open('GET', `${config.host}:${config.port}/orders/1`);
  xhr2.onload = () => {
    const order = JSON.parse(xhr2.responseText);
    const description = statuses.map((t) => {
      if (t.id === order.orderStatusId) {
        return t.description;
      }
      return '';
    })[0];
    setText(`Order Status: ${description}`);
  };
  xhr2.send();
}

export function callbacks() {
  const xhr = new XMLHttpRequest();
  let statuses = [];
  xhr.open('GET', `${config.host}:${config.port}/orderStatuses`);
  xhr.onload = () => {
    statuses = JSON.parse(xhr.responseText);
    const xhr2 = new XMLHttpRequest();
    xhr2.open('GET', `${config.host}:${config.port}/orders/1`);
    xhr2.onload = () => {
      const order = JSON.parse(xhr2.responseText);
      const description = statuses.map((t) => {
        if (t.id === order.orderStatusId) {
          return t.description;
        }
        return '';
      })[0];
      setText(`Order Status: ${description}`);
    };
    xhr2.send();
  };
  xhr.send();
}
