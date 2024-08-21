import { getNormalizedStringArray, isEscapeKey } from './util.js';
import { sendData } from './API.js';
import { showAlertLoadingImages, showSuccess } from './constants.js';
import { resetScale, resetSlider } from './photo-filter.js';

const form = document.querySelector('.img-upload__form');
const uploadInput = form.querySelector('.img-upload__input');
const editingImage = form.querySelector('.img-upload__overlay');
const cancelButton = form.querySelector('.cancel');
const submitButton = form.querySelector('.img-upload__submit');
const hashtagsInput = form.querySelector('.text__hashtags');
const descriptionImage = form.querySelector('.text__description');
const preview = document.querySelector('.img-upload__preview img');

const MAX_HASHTAGS_COUNT = 5;
const MAX_COMMENTS_SYMBOLS = 140;
const MIN_HASHTAG_SYMBOLS = 1;
const MAX_HASHTAG_SYMBOLS = 19;

const regexpHashtag = new RegExp(`^#[a-zа-яё0-9]{${MIN_HASHTAG_SYMBOLS},${MAX_HASHTAG_SYMBOLS}}$`, 'i');

const FILES_TYPES = ['jpg', 'png', 'gif', 'jpeg'];

const ErrorMessage = {
  HASHTAG_COUNT: `Количество хэштэгов должно быть не более ${MAX_HASHTAGS_COUNT}`,
  DUPLICATE_HASHTAGS: 'Хэштэги не должны повторяться',
  COMMENTS_SYMBOLS: `Максимальная длинна комментария ${MAX_COMMENTS_SYMBOLS}`,
  HASHTAG_VALID_ERROR: 'Невалидный хэштег',
  HASHTAG_COUNT_SYMBOLS: `Минимальная длинна хэштег ${MIN_HASHTAG_SYMBOLS} не включая #`
};

const SubmitButtonText = {
  IDLE: 'ОПУБЛИКОВАТЬ',
  SENDING: 'ОТПРАВЛЯЕТСЯ...'
};

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error'
});

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    if (![hashtagsInput, descriptionImage].includes(document.activeElement)) {
      closeModal();
    }
  }
};

const uploadInputHandler = () => {
  uploadInput.addEventListener('change', () => {
    const file = uploadInput.files[0];
    const fileName = file.name.toLowerCase();
    const matches = FILES_TYPES.some((it) => fileName.endsWith(it));
    if (matches) {
      preview.src = URL.createObjectURL(file);
      preview.style.setProperty('width', '100%');
    }
    openModal();
  });
};

const validateHashtagCount = (input) => {
  const hashtags = getNormalizedStringArray(input);
  return hashtags.length <= MAX_HASHTAGS_COUNT;
};

const hasValidTags = (input) => {
  if (!input.length) {
    return true;
  }
  return getNormalizedStringArray(input).every((tag) => regexpHashtag.test(tag));
};

const validateHashtagDuplicate = (input) => {
  const hashtags = getNormalizedStringArray(input).map((tag) => tag.toLowerCase());
  const uniqueHashtags = new Set(hashtags);
  return hashtags.length === uniqueHashtags.size;
};

const validateDescriptionLength = (input) => MAX_COMMENTS_SYMBOLS >= input.length;

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

pristine.addValidator(hashtagsInput, hasValidTags, ErrorMessage.HASHTAG_VALID_ERROR, 1, true);
pristine.addValidator(hashtagsInput, validateHashtagCount, ErrorMessage.HASHTAG_COUNT, 3, true);
pristine.addValidator(hashtagsInput, validateHashtagDuplicate, ErrorMessage.DUPLICATE_HASHTAGS, 2, true);
pristine.addValidator(descriptionImage, validateDescriptionLength, ErrorMessage.COMMENTS_SYMBOLS, 4, true);

const formSubmit = () => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (pristine.validate()) {
      blockSubmitButton();
      sendData(new FormData(evt.target))
        .then(() => {
          closeModal();
          showSuccess();
        })
        .catch(
          () => {
            showAlertLoadingImages();
          }
        ).finally(unblockSubmitButton);
    }
  });
};

function openModal() {
  editingImage.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
}

function closeModal() {
  form.reset();
  resetScale();
  resetSlider();
  pristine.reset();
  editingImage.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
}

cancelButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  closeModal();
});

export { uploadInputHandler, formSubmit, openModal, form, preview, uploadInput };
