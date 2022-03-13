((fj) => {
  fj.app = {
    debug(...args) {
      const [key, obj] = args;
      const _ = '\n--- - --- - --- - --- - ---\n';
      const msg = `DEBUG => [${key}]${_}`;
      window.console.debug(msg, obj);
    },
  };

  const interval = setInterval(_init, 1e2);
  function _init() {
    if (document.readyState === 'complete') {
      clearInterval(interval);
      fj.app.debug('document.readyState', document.readyState);
    }
  }
})(window.fj || (window.fj = {}));