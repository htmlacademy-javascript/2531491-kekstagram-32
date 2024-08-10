import {getRandomInteger, getRandomArrayElement, getUniqIdNumber} from './util.js';
import {NAMES, DESCRIPTION, MESSAGE, ID_AVATAR, INFO_BLOCK_COUNT, LIKES_FOR_IMAGES_COUNT_MIN, LIKES_FOR_IMAGES_COUNT_MAX, MIN_COMMENTS, MAX_COMMENTS} from './constants.js';

const createId = getUniqIdNumber();
const createIdComments = getUniqIdNumber();

const createCommentBlock = () => {

  const idComments = createIdComments();

  return {
    idComment: idComments,
    avatar: `img/avatar-${getRandomArrayElement(ID_AVATAR)}.svg`,
    message: getRandomArrayElement(MESSAGE),
    name: getRandomArrayElement(NAMES)
  };
};

const createInfoBlock = () => {
  const id = createId();
  const urlLink = `photos/${id}.jpg`;
  const desc = DESCRIPTION[`${id - 1}`];
  const commentBlock = Array.from({length: getRandomInteger(MIN_COMMENTS, MAX_COMMENTS)}, createCommentBlock);

  return {
    id: id,
    url: urlLink,
    description: desc,
    likes: getRandomInteger(LIKES_FOR_IMAGES_COUNT_MIN, LIKES_FOR_IMAGES_COUNT_MAX),
    comments: commentBlock
  };
};

//const mockedPhotos = () => Array.from({length: INFO_BLOCK_COUNT}, createInfoBlock);

export {createInfoBlock};
