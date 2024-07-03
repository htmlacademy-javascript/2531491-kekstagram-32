
/**
 *
 * @param {строка для сравнения} stringOnTest
 * @param {максимальная длинна строки} maxLinelength
 * @returns функция сравнения полученной строки с максимально допустимым количеством символов
 */
// eslint-disable-next-line no-unused-vars
function getDataForVerification (stringOnTest, maxLinelength) {
  if(stringOnTest.length <= maxLinelength) {
    return true;
  } else if(stringOnTest.length > maxLinelength) {
    return false;
  }
}

/**
 *
 * @param {принимает слово(а) для проверки} word
 * @returns выполняет проверку полученного слова на палиндром
 */
// eslint-disable-next-line no-unused-vars
function palindrome(word) {
  const upscaleWord = word.toLowerCase().replace(/\s/g, '');
  if(upscaleWord === upscaleWord.split('').reverse().join('')) {
    return 'Это палидром!';
  }
  return 'Это не палидром!';
}

/**
 *
 * @param {строка в которую передают начало рабочего дня('8:00')} startDayWork
 * @param {строка в которую передают окончание рабочего дня('17:30')} endedDayWork
 * @param {строка в которую передают начало встречи('14:00')} startingMeeting
 * @param {строка в которую передают продолжительность встречи в минутах} meetingDuration
 * @returns возвращает true, если встреча не выходит за рамки рабочего дня, и false, если выходит
 */
// eslint-disable-next-line no-unused-vars
const timeForMeeting = (startDayWork, endedDayWork, startingMeeting, meetingDuration) => {
  /**
   *
   * @param {получаем введенную строку со значением времени} str
   * @returns разлаживаем нашу строку на массив при помощи метода map и приводим к числу, потом возвращаем из функции значение времени в минутах
   */
  function timeToMinutes(str) {
    const [hours, minutes] = str.split(':').map(Number);
    return hours * 60 + minutes;
  }
  //получаем время в минутах начала рабочего дня
  const startDayForWork = timeToMinutes(startDayWork);
  //получаем время в минутах окончания рабочего дня
  const endedDayForWork = timeToMinutes(endedDayWork);
  //получаем время в минутах начала встречи
  const startMeeting = timeToMinutes(startingMeeting);
  //получаем время в минутах окончания встречи
  const endedMeeting = startMeeting + meetingDuration;

  if(startDayForWork <= startMeeting && endedMeeting <= endedDayForWork) {
    return true;
  }
  return false;
};
const test = timeForMeeting('14:00', '17:30', '08:0', 90);
// eslint-disable-next-line no-console
console.log(test);
