import { SCALE_PER_STEP, MIN_SCALE, MAX_SCALE, DEFAULT_SCALE } from './constants.js';

const scaleContainer = document.querySelector('.img-upload__scale');
const buttonSmaller = scaleContainer.querySelector('.scale__control--smaller');
const buttonBigger = scaleContainer.querySelector('.scale__control--bigger');
const valueScale = scaleContainer.querySelector('.scale__control--value');
const sliderContainer = document.querySelector('.effect-level');
const sliderElement = sliderContainer.querySelector('.effect-level__slider');
const effectLevelValueElement = sliderContainer.querySelector('.effect-level__value');
const preview = document.querySelector('.img-upload__preview img');
const effectsElement = document.querySelector('.effects');

const effectToOptions = [
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
    step: 0.1,
    unit: ''
  },
  {
    name: 'sepia',
    style: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
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
    step: 0.1,
    unit: 'px'
  },
  {
    name: 'heat',
    style: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: ''
  },
];

const DEFAULT_EFFECT = effectToOptions[0];
let chosenEffect = DEFAULT_EFFECT;

const hideSlider = () => {
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
    hideSlider();
  } else {
    showSlider();
  }
};

const resetSlider = () => {
  chosenEffect = DEFAULT_EFFECT;
  updateSlider();
};

const onEffectsChange = (evt) => {
  if (!evt.target.classList.contains('effects__radio')) {
    return;
  }
  chosenEffect = effectToOptions.find((effect) => effect.name === evt.target.value);
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
  connect: 'lower',
  format: {
    to: (value) => Number(value),
    from: (value) => Number(value),
  }
});

const scaleImage = (value) => {
  preview.style.transform = `scale(${value / 100})`;
  valueScale.value = `${value}%`;
};

const onScaleButtonsImageSmaller = () => {
  scaleImage(
    Math.max(parseInt(valueScale.value, 10) - SCALE_PER_STEP, MIN_SCALE)
  );
};

const onScaleButtonsImageBigger = () => {
  scaleImage(
    Math.min(parseInt(valueScale.value, 10) + SCALE_PER_STEP, MAX_SCALE)
  );
};

const resetScale = () => {
  scaleImage(DEFAULT_SCALE);
};

hideSlider();

effectsElement.addEventListener('change', onEffectsChange);
sliderElement.noUiSlider.on('update', onSliderUpdate);
buttonSmaller.addEventListener('click', onScaleButtonsImageSmaller);
buttonBigger.addEventListener('click', onScaleButtonsImageBigger);

export { resetSlider, resetScale };
