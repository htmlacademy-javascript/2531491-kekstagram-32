import { MAX_RANDOM_PICTURE_COUNT } from './constants.js';
import { debounce } from './util.js';
import { createPreview } from './render-pictures.js';

const imgFiltersContainer = document.querySelector('.img-filters');

const imageChooseFilterButtons = () => {
  imgFiltersContainer.classList.remove('img-filters--inactive');
};

const sortItems = {
  sortToRandom: () => 0.5 - Math.random(),
  sortToDiscussed: (imageA, imageB) => imageA.comments.length - imageB.comments.length
};

const resetPictureList = () => {
  const picturesElement = document.querySelector('.pictures').querySelectorAll('.picture');
  picturesElement.forEach((element) => element.remove());
};

const debounceCreateImages = debounce(createPreview);

const chooseFilter = (name, picturesData) => {
  let newItems = picturesData.slice();
  switch (name) {
    case 'filter-random':
      newItems = picturesData.toSorted(sortItems.sortToRandom).slice(0, MAX_RANDOM_PICTURE_COUNT);
      break;
    case 'filter-discussed':
      newItems = picturesData.toSorted(sortItems.sortToDiscussed);
      break;
    default:
      debounceCreateImages(newItems);
      break;
  }
  debounceCreateImages(newItems);
};

const setActiveButtons = (clickButton) => {
  if (clickButton.classList.contains('img-filters__button--active')) {
    return;
  }
  const activeButton = imgFiltersContainer.querySelector('.img-filters__button--active');
  activeButton.classList.remove('img-filters__button--active');
  clickButton.classList.add('img-filters__button--active');
};

const initFilter = (picturesData) => {
  imageChooseFilterButtons();

  imgFiltersContainer.addEventListener('click', (evt) => {
    evt.stopPropagation();
    resetPictureList();

    const chooseFilterButton = evt.target.closest('.img-filters__button');
    if (chooseFilterButton) {
      setActiveButtons(chooseFilterButton);
      chooseFilter(chooseFilterButton.id, picturesData);
    }
  });
};

export { imageChooseFilterButtons, initFilter };
