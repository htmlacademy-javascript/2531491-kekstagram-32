import { createPreview } from './render-pictures.js';
import { uploadInputHandler, onFormSubmit, closeModal } from './form-validation.js';
import { resetSlider } from './photo-filter.js';
import {getData} from './API.js';
import {showAlert} from './constants.js';
import { initFilter } from './filter.js';

getData()
  .then((data) => {
    createPreview(data);
    initFilter(data);
  })
  .catch(
    (err) => {
      showAlert(err.message);
    }
  );

uploadInputHandler();
onFormSubmit(closeModal);
resetSlider();
