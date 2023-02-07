import {fetchRequest, renderGoods} from './modules/renderGoods.js';
import {productsCart, url} from './modules/const.js';
import {addNewGood} from './modules/goodsControl.js';
import showModal from './modules/modal.js';

const init = async () => {
  await fetchRequest(url, {
    method: 'get',
    callback: renderGoods,
  });

  productsCart.addEventListener('click', async () => {
    const {form, overlay, message} = await showModal(null, null);
    addNewGood(form, overlay, message);
  });
};

init();
