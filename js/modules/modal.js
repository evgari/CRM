import {goods} from './getElems.js';
import page from './page.js';

const modalControll = (overlay, productsCart, idField) => {
  const openModal = () => {
    overlay.classList.add('open');

    idField.textContent = page.generateId();
  };

  const closeModal = () => {
    overlay.classList.remove('open');
  };

  productsCart.addEventListener('click', openModal);

  overlay.addEventListener('click', e => {
    const target = e.target;

    if (target === overlay ||
      target.closest('.btn-close')) {
      closeModal();
    }
  });

  return {
    closeModal,
  };
};

const checkDisconst = form => {
  form.discont.addEventListener('change', e => {
    const promoInput = form.promo;

    promoInput.classList.toggle('form__input_disabled');

    if (promoInput.classList.contains('form__input_disabled')) {
      promoInput.disabled = true;
      promoInput.value = '';
    } else {
      promoInput.disabled = false;
    }
  });
};

const showModalTotal = (form, field) => {
  const price = form.price;
  const count = form.count;

  const changeTotal = property => {
    property.addEventListener('change', () => {
      field.textContent = `$${form.price.value * form.count.value}`;
    });
  };

  changeTotal(price);
  changeTotal(count);
};

const addGoodPage = (good, table) => {
  table.append(page.createRow(good));
};

const addGoodData = good => {
  goods.push(good);
};

const getGoodTotal = obj => {
  const total = obj.price * obj.count;

  return total;
};

const formControll = (form, table, closeModal) => {
  const formTotal = form.querySelector('.form__summary span');

  checkDisconst(form);
  showModalTotal(form, formTotal);

  form.addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const newGood = Object.fromEntries(formData);
    newGood.id = document.querySelector('.vendor-code__id').textContent;
    newGood.total = getGoodTotal(newGood);

    formTotal.textContent = `$0`;
    form.promo.classList.add('form__input_disabled');
    form.promo.disabled = true;

    addGoodPage(newGood, table);
    addGoodData(newGood);
    form.reset();
    closeModal();

    page.showTotal(goods);
  });
};

export default {
  modalControll,
  formControll,
  getGoodTotal,
};
