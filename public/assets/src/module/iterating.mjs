import config from './config.mjs';
import setText, { appendText } from './results.mjs';

export async function get() {
  fj.app.debug('get()', 'fired...');
  const { data } = await axios.get(`${config.host}:${config.port}/orders/1`);
  setText(JSON.stringify(data));
}

export async function getCatch() {
  fj.app.debug('getCatch()', 'fired...');
  try {
    const { data } = await axios.get(`${config.host}:${config.port}/orders/123`);
    setText(JSON.stringify(data));
  } catch (error) {
    setText(error);
  }
}

export async function chain() {
  fj.app.debug('chain()', 'fired...');
  const { data } = await axios.get(`${config.host}:${config.port}/orders/1`);
  const { data: address } = await axios.get(
    `${config.host}:${config.port}/addresses/${data.shippingAddress}`,
  );
  setText(`City: ${JSON.stringify(address.city)}`);
}

export async function concurrent() {
  fj.app.debug('concurrent()', 'fired...');
  const orderStatuses = axios.get(`${config.host}:${config.port}/orderStatuses`);
  const orders = axios.get(`${config.host}:${config.port}/orders`);

  setText('');

  const { data: statuses } = await orderStatuses;
  const { data: order } = await orders;

  appendText(JSON.stringify(statuses));
  appendText(JSON.stringify(order[0]));
}

export async function parallel() {
  fj.app.debug('parallel()', 'fired...');
  setText('');
  await Promise.all([
    (async () => {
      const { data } = await axios.get(`${config.host}:${config.port}/orderStatuses`);
      appendText(JSON.stringify(data));
    })(),
    (async () => {
      const { data } = await axios.get(`${config.host}:${config.port}/orders`);
      appendText(JSON.stringify(data[0]));
    })()]);
}
