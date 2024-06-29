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

const ID_AVATAR = [1, 2, 3, 4 , 5, 6];

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

const INFO_BLOCK_COUNT = 25;

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const getUnicIdNumber = (max) => {

  const idArray = [];

  return function() {
    let result = Math.ceil(Math.random() * max);
    if (idArray.length >= max) {
      // eslint-disable-next-line no-console
      console.error(`Перебраны все числа из диапазона от 1 до ${max}`);
      return null;
    }
    while(idArray.includes(result)) {
      result = Math.ceil(Math.random() * max);
    }
    idArray.push(result);
    return result;
  };
};

const createInfoBlock = () => {
  const id = getUnicIdNumber(25);
  const idComments = getUnicIdNumber(200);

  return {
    id: id(),
    url: `photos/${id()}.jpg`,
    description: `${DESCRIPTION[id()]}`,
    likes: getRandomInteger(15, 200),
    comments: {
      id: idComments(),
      avatar: `img/avatar-${getRandomArrayElement(ID_AVATAR)}.svg`,
      message: getRandomArrayElement(MESSAGE),
      name: getRandomArrayElement(NAMES),
    }
  };
};

const infoBlock = Array.from({length: INFO_BLOCK_COUNT}, createInfoBlock);

// eslint-disable-next-line no-console
console.log(infoBlock);
