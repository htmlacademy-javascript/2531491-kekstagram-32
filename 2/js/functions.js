
/**
 *
 * @param {строка для сравнения} stringOnTest
 * @param {максимальная длинна строки} maxLinelength
 * @returns функция сравнения полученной строки с максимально допустимым количеством символов
 */
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
function palindrome(word) {
  const upscaleWord = word.toLowerCase().replace(/\s/g, '');
  if(upscaleWord === upscaleWord.split('').reverse().join('')) {
    return 'Это палидром!';
  }
  return 'Это не палидром!';
}


