const getNormalizedStringArray = (string) => string.toString().toLowerCase().trim().replace(/\s+/g, ' ').split(' ');

const isEscapeKey = (evt) => evt.key === 'Escape';

function debounce(callback, timeoutDelay = 500) {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

function throttle(callback, delayBetweenFrames) {
  let lastTime = 0;

  return (...rest) => {
    const now = new Date();

    if (now - lastTime >= delayBetweenFrames) {
      callback.apply(this, rest);
      lastTime = now;
    }
  };
}

export { isEscapeKey, getNormalizedStringArray, debounce, throttle };
