const NAMES = [
  'Иван',
  'Павел',
  'Мария',
  'Инга',
  'Инна',
  'Юлия',
  'Лолита',
  'Артур',
  'Дмтрий',
  'Ростислав',
  'Людмила',
  'Галина',
  'Нина',
  'Александр',
  'Петр',
  'Денис',
];

const DESCRIPTION = [
  'Перекрасный пляж в санатории',
  'Указатель на пляж',
  'Пляж на море со стороны скал',
  'Красивая девушка с фотоаппаратом',
  'Вкусный суп с рисовыми человечками в нем',
  'Эффектный спортивный автомобиль черно-матового цвета',
  'Клубника в тарелке',
  'Пара стаканов с вкусным виноградным соком',
  'Девушка на пляже, тянущая руки в пролетающему над ней самолету',
  'Выдвижная подставка для обуви',
  'Пляж обустроенный проходом через него, огороженный забором',
  'Белая ауди',
  'Салат из овощей',
  'Котик одетый в костюм бутерброда',
  'Ноги на спинке дивана',
  'Небо с облаками и летящий в дали самолет',
  'Хор поет на сцене',
  'Раритетный автомобиль в гараже',
  'Тапочки со встроенными в них фонариками',
  'Аллея из пальм возле отеля',
  'Вкусный мясной салат',
  'Закат на пляже',
  'Краб на камне',
  'Концерт Тиесто',
  'Атака бегемота на белый внедорожник который проезжает по воде',
];

const MESSAGE = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Как можно было поймать такой неудачный момент?!',
];

const ID_AVATAR = [1, 2, 3, 4 , 5, 6];
const INFO_BLOCK_COUNT = 25;
const LIKES_FOR_IMAGES_COUNT_MIN = 15;
const LIKES_FOR_IMAGES_COUNT_MAX = 200;
const MIN_COMMENTS = 0;
const MAX_COMMENTS = 30;
const SHOW_TIME = 5000;

export const showAlert = () => {
  const alertContainer = document.querySelector('#data-error').content.querySelector('.data-error');

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, SHOW_TIME);
};

export const showSuccess = () => {
  const successContainer = document.querySelector('#success').content.querySelector('.success');

  document.body.append(successContainer);

  setTimeout(() => {
    successContainer.remove();
  }, SHOW_TIME);
};

export const API_URL = 'https://32.javascript.htmlacademy.pro/kekstagram';

export const METHOD = {
  GET: 'GET',
  POST: 'POST'
};

export const ROUTE = {
  GET_DATA: '/data',
  SEND_DATA: '/'
};

export {NAMES, DESCRIPTION, MESSAGE, ID_AVATAR, INFO_BLOCK_COUNT, LIKES_FOR_IMAGES_COUNT_MIN, LIKES_FOR_IMAGES_COUNT_MAX, MIN_COMMENTS, MAX_COMMENTS};
