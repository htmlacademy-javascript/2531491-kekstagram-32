const form = document.querySelector('.img-upload__form');
const uploadInput = form.querySelector('.img-upload__input');
const editingImage = form.querySelector('.img-upload__overlay');
const cancelButton = form.querySelector('.cancel');
const hashtagsInput = form.querySelector('.text__hashtags');
const descriptionImage = form.querySelector('.text__description');

const regexpHashtag = /^#[a-zа-я0-9]{1,19}$/i;

const clearInputs = () => {
  uploadInput.value = '';
  hashtagsInput.value = '';
  descriptionImage.value = '';
};

function openModal() {
  editingImage.classList.remove('hidden');
  document.body.classList.add('modal-open');
}

function closeModal() {
  editingImage.classList.add('hidden');
  document.body.classList.remove('modal-open');
}

cancelButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  closeModal();
  clearInputs();
});

const uploadInputHandler = () => {
  uploadInput.addEventListener('change', (evt) => {
    evt.preventDefault();
    openModal();
  });
};

const hashtagTest = (item) => !regexpHashtag.test(item);

function validateInputHashtags(input) {
  const hashtags = input.value.trim().split(/\s+/);
  const uniqueHashtags = new Set();

  if (hashtags.length > 5) {
    return false;
  }

  for (let item = 0; item < hashtags.length; item++) {
    if (hashtagTest(hashtags[item])) {
      return false;
    }
    if (uniqueHashtags.has(hashtags[item].toLowerCase())) {
      return false;
    }
    uniqueHashtags.add(hashtags[item].toLowerCase());
  }

  return true;
}

function validateInputDescription(input) {
  return input.value.length <= 140;
}

const pristine = new Pristine(form);

form.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValidHashtags = validateInputHashtags(hashtagsInput);
  const isValidDescription = validateInputDescription(descriptionImage);

  const isValid = pristine.validate() && isValidHashtags && isValidDescription;
  if(isValid) {
    clearInputs();
    closeModal();
  } else {
    alert('error send message');
  }
});

export {uploadInputHandler};
