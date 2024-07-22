let photos = [];

const savePhotoState = (newPhotos) => {
  photos = newPhotos;
};

const getPhotoById = (id) => photos.find((photo) => photo.id === id);

export {savePhotoState, getPhotoById};
