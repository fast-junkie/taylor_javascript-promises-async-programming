((fj) => {
  fj.app = {
    debug(...args) {
      const [key, obj] = args;
      const _ = '\n--- - --- - --- - --- - ---\n';
      const msg = `DEBUG => [${key}]${_}`;
      window.console.debug(msg, obj);
    },
    loader() {
      const loader = document.querySelector('.loader');
      if (loader.classList.contains('d-none')) {
        loader.classList.remove('d-none');
        return;
      }
      loader.classList.add('d-none');
    },
  };

  // fj.app.loader();
  const interval = setInterval(_init, 1e2);
  function _init() {
    if (document.readyState === 'complete') {
      clearInterval(interval);
      fj.app.debug('document.readyState', document.readyState);

      // fj.app.loader();
    }
  }
})(window.fj || (window.fj = {}));
