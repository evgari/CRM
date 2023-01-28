import {elems} from './modules/getElems.js';
import page from './modules/page.js';
import modal from './modules/modal.js';
import {getData} from './modules/getData.js';

const url = elems.url;
const form = elems.form;
const overlay = elems.overlay;
const productsCart = elems.productsCart;
const idField = elems.idField;
const renderGoods = page.renderGoods;
const deleteControll = page.deleteControll;
const modalControll = modal.modalControll;
const formControll = modal.formControll;

const goods = await getData(url, 'get');
console.log('goods: ', goods);

const init = () => {
  const {closeModal} = modalControll(overlay, productsCart, idField);

  renderGoods(null, goods);
  formControll(form, renderGoods, closeModal);
  deleteControll();
};

init();
