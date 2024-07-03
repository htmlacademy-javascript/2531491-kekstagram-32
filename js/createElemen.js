import {getRandomInteger, getRandomArrayElement, getUnicIdNumber} from './util';
import {NAMES, DESCRIPTION, MESSAGE, ID_AVATAR, INFO_BLOCK_COUNT, LIKES_FOR_IMAGES_COUNT_MIN, LIKES_FOR_IMAGES_COUNT_MAX} from './data';

const createId = getUnicIdNumber();
const createIdComments = getUnicIdNumber();

const createInfoBlock = () => {
  const id = createId();
  const urlLink = `photos/${id}.jpg`;
  const desc = `${DESCRIPTION[id]}`;

  return {
    id: id,
    url: urlLink,
    description: desc,
    likes: getRandomInteger(LIKES_FOR_IMAGES_COUNT_MIN, LIKES_FOR_IMAGES_COUNT_MAX)
  };
};

const createCommentBlock = () => {

  const idComments = createIdComments();

  return {
    idComment: idComments,
    avatar: `img/avatar-${getRandomArrayElement(ID_AVATAR)}.svg`,
    message: getRandomArrayElement(MESSAGE),
    name: getRandomArrayElement(NAMES)
  };
};

const infoBlock = Array.from({length: INFO_BLOCK_COUNT}, createInfoBlock);
const commentBlock = Array.from({length: INFO_BLOCK_COUNT}, createCommentBlock);

export {infoBlock, commentBlock};
