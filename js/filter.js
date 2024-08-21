import { MAX_RANDOM_PICTURE_COUNT } from './constants.js';

const imgFiltersContainer = document.querySelector('.img-filters');
const Filter = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed'
};
let newItems = [];
let activeFilter = Filter.DEFAULT;

const imageChooseFilterButtons = () => {
  imgFiltersContainer.classList.remove('img-filters--inactive');
};

const sortItems = {
  sortToRandom: () => Math.random() - 0.5,
  sortToDiscussed: (imageA, imageB) => imageB.comments.length - imageA.comments.length
};

const resetPictureList = () => {
  const picturesElement = document.querySelector('.pictures').querySelectorAll('.picture');
  picturesElement.forEach((element) => element.remove());
};

const chooseFilter = () => {
  switch (activeFilter) {
    case Filter.RANDOM:
      return [...newItems].sort(sortItems.sortToRandom).slice(0, MAX_RANDOM_PICTURE_COUNT);
    case Filter.DISCUSSED:
      return [...newItems].sort(sortItems.sortToDiscussed);
    default:
      return [...newItems];
  }
};

const setActiveButtons = (clickButton) => {
  if (clickButton.classList.contains('img-filters__button--active')) {
    return;
  }
  const activeButton = imgFiltersContainer.querySelector('.img-filters__button--active');
  activeButton.classList.remove('img-filters__button--active');
  clickButton.classList.add('img-filters__button--active');
};

const initFilter = (loaderPictures, picturesData) => {
  imageChooseFilterButtons();

  imgFiltersContainer.addEventListener('click', (evt) => {
    evt.stopPropagation();
    resetPictureList();

    newItems = [...loaderPictures];

    const chooseFilterButton = evt.target.closest('.img-filters__button');
    activeFilter = chooseFilterButton.id;

    setActiveButtons(chooseFilterButton);
    picturesData(chooseFilter());

  });
};

export { initFilter, chooseFilter };
