import {goods, elems} from './modules/getElems.js';
import page from './modules/page.js';
import modal from './modules/modal.js';

const form = elems.form;
const table = elems.table;
const overlay = elems.overlay;
const productsCart = elems.productsCart;
const idField = elems.idField;
const renderGoods = page.renderGoods;
const deleteControll = page.deleteControll;
const modalControll = modal.modalControll;
const formControll = modal.formControll;

const init = () => {
  const {closeModal} = modalControll(overlay, productsCart, idField);

  renderGoods(goods);
  formControll(form, table, closeModal);
  deleteControll();
};

init();
