import { isEscapeKey } from './util.js';

const fullImageContainer = document.querySelector('.big-picture');
const commentsList = fullImageContainer.querySelector('.social__comments');
const closeButton = fullImageContainer.querySelector('.big-picture__cancel');
const showMoreCommentsButton = fullImageContainer.querySelector('.social__comments-loader');
const viewCommentsShow = fullImageContainer.querySelector('.social__comment-shown-count');
const template = document.querySelector('#comment').content.querySelector('.social__comment');


const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModal();
  }
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

closeButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  closeModal();
});

const getViewImage = function(dataset) {

  const fullImage = fullImageContainer.querySelector('.big-picture__img');
  const likesImages = fullImageContainer.querySelector('.likes-count');
  const imageDescription = fullImageContainer.querySelector('.social__caption');

  const totalCommentCount = fullImageContainer.querySelector('.social__comment-total-count');
  const imageToFrame = fullImage.querySelector('img');

  imageToFrame.src = dataset.url;
  imageToFrame.alt = dataset.description;
  likesImages.textContent = dataset.likes;
  imageDescription.textContent = dataset.description;
  totalCommentCount.textContent = dataset.comments.length;

  commentsList.innerHTML = '';

  showComments(dataset);
  openModal();
};

function showComments(data) {

  viewCommentsShow.textContent = 0;

  data.comments.forEach((item, index) => {

    const itemComment = createComment(item);
    commentsList.append(itemComment);
    itemComment.classList.add('hidden');

    if(index <= 4) {
      showMoreCommentsButton.classList.add('hidden');
      itemComment.classList.remove('hidden');
      viewCommentsShow.textContent = index + 1;
    } else if(index > 4) {
      getMoreComments();
      showMoreCommentsButton.classList.remove('hidden');
    }
  });
}

function getMoreComments() {
  const currentIndex = 4;
  listenerClickShowButton(showMoreCommentsButton, currentIndex);
}

function listenerClickShowButton(btn, currIndex) {
  const clickHandler = () => {
    searchHiddenElements(currIndex);
    currIndex += 5;
    if (!hasMoreComments(currIndex)) {
      btn.removeEventListener('click', clickHandler);
    }
  };
  btn.addEventListener('click', clickHandler);
}

function hasMoreComments(index) {
  const allComments = commentsList.querySelectorAll('.social__comment');
  return index + 1 < allComments.length;
}

function searchHiddenElements(index) {

  const allComments = commentsList.querySelectorAll('.social__comment');

  for(let i = index + 1; i <= index + 5; i++) {

    if(allComments[i]) {
      allComments[i].classList.remove('hidden');
      viewCommentsShow.textContent = i + 1;
    } else {
      showMoreCommentsButton.classList.add('hidden');
    }
  }
}

function createComment(item) {
  const comment = template.cloneNode(true);

  const img = comment.querySelector('img');
  img.src = item.avatar;
  img.alt = item.name;
  comment.querySelector('p').textContent = item.message;

  return comment;
}

export {getViewImage};
