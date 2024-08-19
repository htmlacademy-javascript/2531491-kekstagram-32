import { isEscapeKey } from './util.js';

const fullImageContainer = document.querySelector('.big-picture');
const fullImage = fullImageContainer.querySelector('.big-picture__img');
const imageToFrame = fullImage.querySelector('img');
const likesImages = fullImageContainer.querySelector('.likes-count');
const imageDescription = fullImageContainer.querySelector('.social__caption');
const commentsList = fullImageContainer.querySelector('.social__comments');
const closeButton = fullImageContainer.querySelector('.big-picture__cancel');
const showMoreCommentsButton = fullImageContainer.querySelector('.social__comments-loader');
const viewCommentsShow = fullImageContainer.querySelector('.social__comment-shown-count');
const template = document.querySelector('#comment').content.querySelector('.social__comment');
const totalCommentCount = fullImageContainer.querySelector('.social__comment-total-count');

const COMMENTS_STEP = 5;
let currentComments = [];

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModal();
  }
};

const renderComments = (comments) => {
  commentsList.innerHTML = '';
  totalCommentCount.textContent = comments.length;
  currentComments = comments;
  showMoreCommentsButton.click();
};

const getViewImage = function(dataset) {
  imageToFrame.src = dataset.url;
  imageToFrame.alt = dataset.description;
  likesImages.textContent = dataset.likes;
  imageDescription.textContent = dataset.description;
  totalCommentCount.textContent = dataset.comments.length;
  renderComments(dataset.comments);
  openModal();
};

const createComment = (item) => {
  const comment = template.cloneNode(true);

  const img = comment.querySelector('img');
  img.src = item.avatar;
  img.alt = item.name;
  comment.querySelector('p').textContent = item.message;

  return comment;
};

const showComments = (comments) => {
  const commentsListFragment = document.createDocumentFragment();

  comments.forEach((comment) => {
    const itemComment = createComment(comment);
    commentsListFragment.append(itemComment);
  });
  commentsList.append(commentsListFragment);
};

const onLoaderButtonClick = () => {
  const shownComments = commentsList.childElementCount;
  let endOfSlice = shownComments + COMMENTS_STEP;
  const isAllCommentsShown = endOfSlice >= currentComments.length;
  endOfSlice = isAllCommentsShown ? currentComments.length : endOfSlice;
  const commentsSlice = currentComments.slice(shownComments, endOfSlice);
  showComments(commentsSlice);
  viewCommentsShow.textContent = endOfSlice;
  showMoreCommentsButton.classList.toggle('hidden', isAllCommentsShown);
};

function openModal() {
  fullImageContainer.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
}

function closeModal() {
  fullImageContainer.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
}

showMoreCommentsButton.addEventListener('click', onLoaderButtonClick);

closeButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  closeModal();
});

export {getViewImage, renderComments, onLoaderButtonClick};
