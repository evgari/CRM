import {fetchRequest, renderGoods} from './modules/renderGoods.js';
import {modalControl} from './modules/modalControl.js';
import {formControl} from './modules/formControl.js';

import {
  url,
  overlay,
  productsCart,
  form,
} from './modules/const.js';

const init = () => {
  const {closeModal} = modalControl(overlay, productsCart);
  formControl(form, closeModal);

  fetchRequest(url, {
    method: 'get',
    callback: renderGoods,
  });
};

init();
