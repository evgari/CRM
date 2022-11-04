'use strict';

// const modalTitle = document.querySelector('.modal__title');
// const modalCloseBtn = document.querySelector('.btn-close');
// const modalProductId = document.querySelector('.modal__id');
// const modalForm = document.querySelector('.form');
// const modalCheckbox = document.querySelector('.checkbox');
// const modalDiscontInput = document.querySelector('.js-discont-input');
// const modalTotalPrice = document.querySelector('.summary__count');

const overlay = document.querySelector('.modal');
const productsCart = document.querySelector('.products__cart');

productsCart.addEventListener('click', () => {
  overlay.classList.add('open');
});

overlay.addEventListener('click', e => {
  const target = e.target;

  if (target === overlay ||
    target.closest('.btn-close')) {
    overlay.classList.remove('open');
  }
});

