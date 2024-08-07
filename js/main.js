import { mockedPhotos } from './data.js';
import { savePhotoState } from './photo-state.js';
import { getRenderItems } from './render-pictures.js';
import { uploadInputHandler } from './form-validation.js';
import { resetSlider } from './photo-filter.js';

const photos = mockedPhotos();
savePhotoState(photos);
getRenderItems(photos);

uploadInputHandler();
resetSlider();
