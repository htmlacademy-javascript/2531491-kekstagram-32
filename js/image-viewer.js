import { createElement, isEscapeKey } from './util.js';

const fullImageContainer = document.querySelector('.big-picture');
const commentsList = fullImageContainer.querySelector('.social__comments');
const closeButton = fullImageContainer.querySelector('.big-picture__cancel');


const getViewImage = function(dataset) {
  closeButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    fullImageContainer.classList.add('hidden');
    closeModal();
  });

  const onDocumentKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closeModal();
    }
  };

  function closeModal() {
    fullImageContainer.classList.add('hidden');
    document.removeEventListener('keydown', onDocumentKeydown);
    document.body.classList.remove('modal-open');
  }

  document.addEventListener('keydown', onDocumentKeydown);

  document.body.classList.add('modal-open');
  fullImageContainer.classList.remove('hidden');

  const fullImage = fullImageContainer.querySelector('.big-picture__img');
  const likesImages = fullImageContainer.querySelector('.likes-count');
  const socialCommentCount = fullImageContainer.querySelector('.social__comment-count');
  const commentsLoader = fullImageContainer.querySelector('.comments-loader');
  const imageDescription = fullImageContainer.querySelector('.social__caption');
  const viewCommentsShow = fullImageContainer.querySelector('.social__comment-shown-count');
  const totalCommentCount = fullImageContainer.querySelector('.social__comment-total-count');
  const imageToFrame = fullImage.querySelector('img');

  //socialCommentCount.classList.add('hidden');
  //commentsLoader.classList.add('hidden');

  imageToFrame.src = dataset.url;
  imageToFrame.alt = dataset.description;

  likesImages.textContent = dataset.likes;

  imageDescription.textContent = dataset.description;

  viewCommentsShow.textContent = dataset.comments.length;

  totalCommentCount.textContent = dataset.comments.length;
  commentsList.innerHTML = '';
  dataset.comments.forEach((item) => {
    const commentItem = createElement('li', 'social__comment');
    const imgComment = createElement('img', 'social__picture');

    imgComment.src = item.avatar;
    imgComment.alt = item.name;
    imgComment.setAttribute('width', '35');
    imgComment.setAttribute('height', '35');
    commentItem.append(imgComment);

    const textComment = createElement('p', 'social__text', item.message);

    commentItem.append(textComment);
    commentsList.append(commentItem);
  });

};

export {getViewImage};
