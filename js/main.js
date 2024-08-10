import { createPreview } from './render-pictures.js';
import { uploadInputHandler, onFormSubmit, closeModal } from './form-validation.js';
import { resetSlider } from './photo-filter.js';
import {getData} from './API.js';
import {showAlert} from './constants.js';

getData()
  .then((data) => {
    createPreview(data);
  })
  .catch(
    (err) => {
      showAlert(err.message);
    }
  );

uploadInputHandler();
onFormSubmit(closeModal);
resetSlider();
