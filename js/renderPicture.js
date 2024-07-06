/* eslint-disable no-console */
import {infoBlock, commentBlock} from './createElemen';

const renderList = document.querySelector('.pictures');
const template = document.querySelector('#picture').content.querySelector('.picture');

const createImagesBlock = infoBlock();
// eslint-disable-next-line no-unused-vars
const createCommentBlock = commentBlock();
console.log(createImagesBlock);

const imageFragment = document.createDocumentFragment();

const getRenderItems = function() {
  createImagesBlock.forEach(({url, description, likes}) => {
    const image = template.cloneNode(true);
    image.querySelector('.picture__img').src = url;
    image.querySelector('.picture__img').alt = description;
    image.querySelector('.picture__likes').textContent = likes;
    image.querySelector('.picture__comments').textContent = 0;
    imageFragment.append(image);
  });
  renderList.append(imageFragment);
};

export {getRenderItems};
