import {getViewImage } from './image-viewer.js';


const renderList = document.querySelector('.pictures');
const template = document.querySelector('#picture').content.querySelector('.picture');

const imageFragment = document.createDocumentFragment();

const createPreview = (dataPreview) => {
  const image = template.cloneNode(true);

  image.querySelector('.picture__img').src = dataPreview.url;
  image.querySelector('.picture__img').alt = dataPreview.description;
  image.querySelector('.picture__likes').textContent = dataPreview.likes;
  image.querySelector('.picture__comments').textContent = dataPreview.comments.length;

  image.addEventListener('click', () => {
    getViewImage(dataPreview);
  });

  return image;
};

const getRenderItems = function(dataCards) {
  dataCards.forEach((data) => {
    imageFragment.append(createPreview(data));
  });
  renderList.append(imageFragment);
};


export {getRenderItems};
