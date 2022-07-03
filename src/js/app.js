import { data } from './data.js';

function createElements(title = '', text = '', path = '', active = false) {
  const box = document.createElement('div');
  box.classList.add('box');

  const boxInner = document.createElement('div');
  boxInner.classList.add('box__inner');

  const boxTitle = document.createElement('h2');
  boxTitle.classList.add('box__title');
  boxTitle.textContent = title;

  const boxBtnRemove = document.createElement('div');
  boxBtnRemove.classList.add('box__btn-remove');

  const btnRemoveIcon = document.createElement('img');
  btnRemoveIcon.classList.add('btn-remove__icon');
  btnRemoveIcon.src = path;

  boxBtnRemove.append(btnRemoveIcon);

  boxInner.append(boxTitle);
  boxInner.append(boxBtnRemove);

  const boxText = document.createElement('div');
  boxText.classList.add('box__text');
  boxText.textContent = text;

  box.append(boxInner);
  box.append(boxText);

  if (!active) {
    boxTitle.classList.add('active');
    boxText.classList.add('active');
    boxBtnRemove.classList.add('active');
  }

  return box;
}

(function renderElements() {
  const htmlElements = data.map(({ title, text, path, active }) => {
    return createElements(title, text, path, active);
  });

  htmlElements.forEach((el) => {
    document.querySelector('.box-wrapper').append(el);
  });
})();

function toggleActive({ target }) {
  const btnRemoveIcon = target;
  const btnRemove = target.parentElement;
  const boxTitle = target.parentElement.previousElementSibling;
  const boxText = target.parentElement.parentElement.nextElementSibling;

  if (btnRemoveIcon.getAttribute('src') === 'images/add.svg') {
    btnRemoveIcon.src = 'images/remove.svg';
  } else {
    btnRemoveIcon.src = 'images/add.svg';
  }

  if (!btnRemove || !boxTitle || !boxText) {
    return false;
  }

  btnRemove.classList.toggle('active');
  boxTitle.classList.toggle('active');
  boxText.classList.toggle('active');
}

document.querySelectorAll('.box').forEach((el) => {
  el.addEventListener('click', toggleActive);
});
