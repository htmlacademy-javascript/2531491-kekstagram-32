import { isEscapeKey } from './util.js';

const SHOW_TIME = 5000;
const MAX_RANDOM_PICTURE_COUNT = 10;
const SCALE_PER_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEFAULT_SCALE = 100;
const RENDER_DELAY = 500;
const API_URL = 'https://32.javascript.htmlacademy.pro/kekstagram';

const Method = {
  GET: 'GET',
  POST: 'POST'
};

const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/'
};

const onClickListener = (evt) => {
  evt.stopPropagation();
  const element = document.querySelector('.success') || document.querySelector('.error');
  const closeButton = element.querySelector('button');
  if (evt.target === element || evt.target === closeButton || isEscapeKey(evt)) {
    element.remove();
    document.body.removeEventListener('click', onClickListener);
    document.body.removeEventListener('keydown', onClickListener);
  }
};

const renderResponseMessage = (template) => {
  const currentMessage = template.cloneNode(true);
  document.body.append(currentMessage);
  document.body.addEventListener('click', onClickListener);
  document.body.addEventListener('keydown', onClickListener);
};

const showAlertLoadingImages = () => {
  const errorContainer = document.querySelector('#error').content.querySelector('.error');
  renderResponseMessage(errorContainer);
};

const showAlert = () => {
  const alertContainer = document.querySelector('#data-error').content.querySelector('.data-error');

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, SHOW_TIME);
};

const showSuccess = () => {
  const successContainer = document.querySelector('#success').content.querySelector('.success');
  renderResponseMessage(successContainer);
};

export { Method, Route, API_URL, showSuccess, showAlert, showAlertLoadingImages, MAX_RANDOM_PICTURE_COUNT, SCALE_PER_STEP, MIN_SCALE, MAX_SCALE, DEFAULT_SCALE, RENDER_DELAY };
