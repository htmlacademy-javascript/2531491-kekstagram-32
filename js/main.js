import { createPreview } from './render-pictures.js';
import { uploadInputHandler, formSubmit } from './form-validation.js';
import { resetSlider } from './photo-filter.js';
import { getData } from './API.js';
import { showAlert, RENDER_DELAY } from './constants.js';
import { initFilter } from './filter.js';
import { debounce } from './util.js';

getData()
  .then((data) => {
    const debounceCreateImages = debounce(createPreview, RENDER_DELAY);
    initFilter(data, debounceCreateImages);
    createPreview(data);
  })
  .catch(
    () => {
      showAlert();
    }
  );

uploadInputHandler();
formSubmit();
resetSlider();
