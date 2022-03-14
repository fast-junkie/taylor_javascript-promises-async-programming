export default function setText(text) {
  const results = document.getElementsByClassName('results')[0].children[0];
  results.innerHTML = text.replace ? text.replace(/([{},:])/g, ' $1 ') : text;
}

export function appendText(text) {
  const results = document.getElementsByClassName('results')[0].children[0];
  results.innerHTML += text.replace ? text.replace(/([{},:])/g, ' $1 ') : text;
}

export function showWaiting() {
  const waiting = document.getElementsByClassName('loader')[0];
  waiting.classList.remove('d-none');
}

export function hideWaiting() {
  const waiting = document.getElementsByClassName('loader')[0];
  waiting.classList.add('d-none');
}
