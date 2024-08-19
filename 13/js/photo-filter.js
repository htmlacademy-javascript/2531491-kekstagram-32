import { preview, form } from './form-validation.js';
import { PREVIEW_PER_STEP } from './constants.js';

const scaleContainer = document.querySelector('.img-upload__scale');
const buttonSmaller = scaleContainer.querySelector('.scale__control--smaller');
const buttonBigger = scaleContainer.querySelector('.scale__control--bigger');
const valueScale = scaleContainer.querySelector('.scale__control--value');
const sliderContainer = form.querySelector('.effect-level');
const sliderElement = form.querySelector('.effect-level__slider');
const effectLevelValueElement = form.querySelector('.effect-level__value');
const effectsElement = form.querySelector('.effects');

const Effects = [
  {
    name: 'none',
    style: 'none',
    min: 0,
    max: 100,
    step: 1,
    unit: ''
  },
  {
    name: 'chrome',
    style: 'grayscale',
    min: 0,
    max: 1,
    step: 0.10,
    unit: ''
  },
  {
    name: 'sepia',
    style: 'sepia',
    min: 0,
    max: 1,
    step: 0.10,
    unit: ''
  },
  {
    name: 'marvin',
    style: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%'
  },
  {
    name: 'phobos',
    style: 'blur',
    min: 0,
    max: 3,
    step: 0.10,
    unit: 'px'
  },
  {
    name: 'heat',
    style: 'brightness',
    min: 1,
    max: 3,
    step: 0.10,
    unit: ''
  },
];

const DEFAULT_EFFECT = Effects[0];
let chosenEffect = DEFAULT_EFFECT;

const addHiddenSlider = () => {
  sliderContainer.classList.add('hidden');
};

const showSlider = () => {
  sliderContainer.classList.remove('hidden');
};

const updateSlider = () => {
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: chosenEffect.min,
      max: chosenEffect.max
    },
    step: chosenEffect.step,
    start: chosenEffect.max
  });

  if (chosenEffect === DEFAULT_EFFECT) {
    addHiddenSlider();
  } else {
    showSlider();
  }
};

const resetSlider = () => {
  chosenEffect = DEFAULT_EFFECT;
  updateSlider();
};

const setScaleButtonsImageSmaller = () => {
  const currentWidth = parseFloat(preview.style.getPropertyValue('width'));
  const newWidth = currentWidth - PREVIEW_PER_STEP;

  if (currentWidth <= 25) {
    buttonSmaller.disabled = true;
  } else {
    preview.style.setProperty('width', `${newWidth}%`);
    valueScale.value = `${newWidth}%`;
  }
  buttonSmaller.disabled = false;
};

const setScaleButtonsImageBigger = () => {
  const currentWidth = parseFloat(preview.style.getPropertyValue('width'));
  const newWidth = currentWidth + PREVIEW_PER_STEP;

  if (currentWidth >= 100) {
    buttonBigger.disabled = true;
  } else {
    preview.style.setProperty('width', `${newWidth}%`);
    valueScale.value = `${newWidth}%`;
  }
  buttonBigger.disabled = false;
};

const onEffectsChange = (evt) => {
  if (!evt.target.classList.contains('effects__radio')) {
    return;
  }
  chosenEffect = Effects.find((effect) => effect.name === evt.target.value);
  preview.className = `img-upload__preview effects__preview--${chosenEffect.name}`;
  updateSlider();

};

const onSliderUpdate = () => {
  const sliderValue = sliderElement.noUiSlider.get();
  preview.style.setProperty('filter', (chosenEffect === DEFAULT_EFFECT) ? DEFAULT_EFFECT.style : `${chosenEffect.style}(${sliderValue}${chosenEffect.unit})`);
  effectLevelValueElement.setAttribute('value', sliderValue);
};

noUiSlider.create(sliderElement, {
  range: {
    min: DEFAULT_EFFECT.min,
    max: DEFAULT_EFFECT.max
  },
  start: DEFAULT_EFFECT.max,
  step: DEFAULT_EFFECT.step,
  connect: 'lower'
});

addHiddenSlider();

effectsElement.addEventListener('change', onEffectsChange);
sliderElement.noUiSlider.on('update', onSliderUpdate);
buttonSmaller.addEventListener('click', () => {
  setScaleButtonsImageSmaller();
});
buttonBigger.addEventListener('click', () => {
  setScaleButtonsImageBigger();
});

export { resetSlider };
