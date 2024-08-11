import { getNormalizedStringArray, isEscapeKey } from './util.js';
import {sendData} from './API.js';
import { showAlert, showSuccess } from './constants.js';

export const form = document.querySelector('.img-upload__form');
const uploadInput = form.querySelector('.img-upload__input');
const editingImage = form.querySelector('.img-upload__overlay');
const cancelButton = form.querySelector('.cancel');
const hashtagsInput = form.querySelector('.text__hashtags');
const descriptionImage = form.querySelector('.text__description');
export const preview = document.querySelector('.img-upload__preview img');

const MAX_HASHTAGS_COUNT = 5;
const MAX_COMMENTS_SYMBOLS = 140;
const MIN_HASHTAG_SYMBOLS = 1;
const MAX_HASHTAG_SYMBOLS = 19;

const regexpHashtag = new RegExp(`^#[a-zа-яё0-9]{${MIN_HASHTAG_SYMBOLS},${MAX_HASHTAG_SYMBOLS}}$`,'i');

const FILE_TYPES = ['jpg', 'png', 'gif', 'jpeg'];

const ErrorMessage = {
  HASHTAG_COUNT: `Количество хэштэгов должно быть не более ${MAX_HASHTAGS_COUNT}`,
  DUPLICATE_HASHTAGS: 'Хэштэги не должны повторяться',
  COMMENTS_SYMBOLS: `Максимальная длинна комментария ${MAX_COMMENTS_SYMBOLS}`,
  HASHTAG_VALID_ERROR: 'Невалидный хэштег'
};

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error'
});

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    if(![hashtagsInput, descriptionImage].includes(document.activeElement)) {
      closeModal();
    }
  }
};

function openModal() {
  editingImage.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
}

function closeModal() {
  form.reset();
  pristine.reset();
  editingImage.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
}

cancelButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  closeModal();
});

const uploadInputHandler = () => {
  uploadInput.addEventListener('change', () => {
    const file = uploadInput.files[0];
    const fileName = file.name.toLowerCase();
    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
    if(matches) {
      preview.src = URL.createObjectURL(file);
      preview.style.width = '100%';
    }
    openModal();
  });
};

const hasValidTags = (input) => getNormalizedStringArray(input).every((tag) => regexpHashtag.test(tag));

const validateHashtagCount = (input) => {
  const hashtags = getNormalizedStringArray(input);
  return hashtags.length <= MAX_HASHTAGS_COUNT;
};

const validateHashtagDuplicate = (input) => {
  const hashtags = getNormalizedStringArray(input);
  const uniqueHashtags = new Set(hashtags);
  return hashtags.length === uniqueHashtags.size;
};

const validateDescriptionLength = (input) => MAX_COMMENTS_SYMBOLS >= input.length;

pristine.addValidator(hashtagsInput, hasValidTags, ErrorMessage.HASHTAG_VALID_ERROR, 1, true);
pristine.addValidator(hashtagsInput, validateHashtagCount, ErrorMessage.HASHTAG_COUNT, 3, true);
pristine.addValidator(hashtagsInput, validateHashtagDuplicate, ErrorMessage.DUPLICATE_HASHTAGS, 2, true);
pristine.addValidator(descriptionImage, validateDescriptionLength, ErrorMessage.COMMENTS_SYMBOLS, 4, true);

const onFormSubmit = (onSuccess) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if(pristine.validate()) {
      sendData(new FormData(evt.target))
        .then((onSuccess) => {
          showSuccess();
        })
        .catch(
          (err) => {
            showAlert(err.message);
          }
        );
    }
  });
};

export {uploadInputHandler, onFormSubmit, closeModal, openModal};
