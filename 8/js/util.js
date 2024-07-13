const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

/*function getRandomInteger(min, max) {
  return Math.round(Math.random() * Math.abs(max - min) + min);
}*/


const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];


const getUniqIdNumber = () => {
  let id = 1;
  return () => id++;
};

const createElement = function(tagName, className, text) {
  const element = document.createElement(tagName);
  element.classList.add(className);
  if(text) {
    element.textContent = text;
  }
  return element;
};

const isEscapeKey = (evt) => evt.key === 'Escape';

export {getRandomInteger, getRandomArrayElement, getUniqIdNumber, createElement, isEscapeKey};
