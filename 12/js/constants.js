const INFO_BLOCK_COUNT = 25;
const MIN_COMMENTS = 0;
const MAX_COMMENTS = 30;
const SHOW_TIME = 5000;
export const MAX_RANDOM_PICTURE_COUNT = 10;

export const showAlertLoadingImages = () => {
  const alertContainer = document.querySelector('#error').content.querySelector('.error');

  const closeButton = alertContainer.querySelector('.error__button');
  closeButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    alertContainer.remove();
  });

  document.body.append(alertContainer);
};

export const showAlert = () => {
  const alertContainer = document.querySelector('#data-error').content.querySelector('.data-error');

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, SHOW_TIME);
};

export const showSuccess = () => {
  const successContainer = document.querySelector('#success').content.querySelector('.success');

  const closeButton = successContainer.querySelector('.success__button');
  closeButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    successContainer.remove();
  });

  document.body.append(successContainer);
};

export const API_URL = 'https://32.javascript.htmlacademy.pro/kekstagram';

export const METHOD = {
  GET: 'GET',
  POST: 'POST'
};

export const ROUTE = {
  GET_DATA: '/data',
  SEND_DATA: '/'
};

export {INFO_BLOCK_COUNT, MIN_COMMENTS, MAX_COMMENTS};
