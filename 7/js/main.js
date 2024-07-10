import { mockedPhotos } from './data.js';
import { savePhotoState } from './photo-state.js';
import { getRenderItems } from './render-pictures.js';

const photos = mockedPhotos();
savePhotoState(photos);
getRenderItems(photos);


