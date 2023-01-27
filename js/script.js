import {elems} from './modules/getElems.js';
import page from './modules/page.js';
import modal from './modules/modal.js';
import { getData } from './modules/getData.js';

const form = elems.form;
const table = elems.table;
const overlay = elems.overlay;
const productsCart = elems.productsCart;
const idField = elems.idField;
const renderGoods = page.renderGoods;
const deleteControll = page.deleteControll;
const modalControll = modal.modalControll;
const formControll = modal.formControll;

const url = 'https://spot-plant-broom.glitch.me/api/goods';
const goods = await getData(url, 'get');
console.log('goods: ', goods);

const init = () => {
  const {closeModal} = modalControll(overlay, productsCart, idField);

  renderGoods(goods);
  formControll(form, table, closeModal);
  deleteControll();
};

init();
