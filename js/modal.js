'use strict';

// const modalTitle = document.querySelector('.modal__title');
// const modalCloseBtn = document.querySelector('.btn-close');
// const modalProductId = document.querySelector('.modal__id');
// const modalForm = document.querySelector('.form');
// const modalCheckbox = document.querySelector('.checkbox');
// const modalDiscontInput = document.querySelector('.js-discont-input');
// const modalTotalPrice = document.querySelector('.summary__count');

const overlay = document.querySelector('.modal');
const modal = document.querySelector('.modal__wrapper');
const productsCart = document.querySelector('.products__cart');
const closeModal = document.querySelector('.btn-close');

productsCart.addEventListener('click', () => {
  overlay.classList.add('open');
});

closeModal.addEventListener('click', () => {
  overlay.classList.remove('open');
});

modal.addEventListener('click', event => {
  event.stopPropagation();
});

overlay.addEventListener('click', () => {
  overlay.classList.remove('open');
});

