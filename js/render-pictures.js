import {getViewImage } from './image-viewer.js';


const renderList = document.querySelector('.pictures');
const template = document.querySelector('#picture').content.querySelector('.picture');

const createPreview = (dataPreview) => {
  const imageFragment = document.createDocumentFragment();

  dataPreview.forEach((data) => {
    const image = template.cloneNode(true);
    image.querySelector('.picture__img').src = data.url;
    image.querySelector('.picture__img').alt = data.description;
    image.querySelector('.picture__likes').textContent = data.likes;
    image.querySelector('.picture__comments').textContent = data.comments.length;
    imageFragment.append(image);

    image.addEventListener('click', () => {
      getViewImage(data);
    });
  });

  renderList.append(imageFragment);
};

export { createPreview };
