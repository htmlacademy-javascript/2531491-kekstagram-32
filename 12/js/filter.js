import { MAX_RANDOM_PICTURE_COUNT } from './constants.js';
import { debounce } from './util.js';
import { createPreview, renderList } from './render-pictures.js';

const imgFiltersContainer = document.querySelector('.img-filters');

export const imageChooseFilterButtons = () => {
  imgFiltersContainer.classList.remove('img-filters--inactive');
};

const sortItems = {
  random: () => 0.5 - Math.random(),
  discussed: (imageA, imageB) => imageA.comments.length - imageB.comments.length
};

const debounceCreateImages = debounce(createPreview);

const chooseFilter = (name, picturesData) => {
  let newItems = picturesData.slice();
  switch(name) {
    case 'filter-random':
      newItems = picturesData.toSorted(sortItems.random).slice(0, MAX_RANDOM_PICTURE_COUNT);
      break;
    case 'filter-discussed':
      newItems = picturesData.toSorted(sortItems.discussed);
      break;
    default:
      debounceCreateImages(newItems);
      break;
  }
  debounceCreateImages(newItems);
};

const setActiveButtons = (clickButton) => {
  if(clickButton.classList.contains('img-filters__button--active')) {
    return;
  }
  const activeButton = imgFiltersContainer.querySelector('.img-filters__button--active');
  activeButton.classList.remove('img-filters__button--active');
  clickButton.classList.add('img-filters__button--active');
};

export const initFilter = (picturesData) => {
  imageChooseFilterButtons();
  imgFiltersContainer.addEventListener('click', (evt) => {
    evt.stopPropagation();
    const chooseFilterButton = evt.target.closest('.img-filters__button');
    if(chooseFilterButton) {
      setActiveButtons(chooseFilterButton);
      chooseFilter(chooseFilterButton.id, picturesData);
    }
  });
};
