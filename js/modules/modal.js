import {getData} from './getData.js';
import {elems} from './getElems.js';

const url = elems.url;

const modalControll = (overlay, productsCart) => {
  const openModal = () => {
    overlay.classList.add('open');
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

const getGoodTotal = obj => {
  const total = obj.price * obj.count;

  return total;
};

const formControll = (form, renderGoods, closeModal) => {
  const formTotal = form.querySelector('.form__summary span');

  checkDisconst(form);
  showModalTotal(form, formTotal);

  form.addEventListener('submit', e => {
    e.preventDefault();

    const formData = new FormData(e.target);
    console.log('formData: ', formData);

    const newGood = Object.fromEntries(formData);
    console.log('newGood: ', newGood);

    const discont = form.discont.checked ? form.promo.value :
      '';

    getData(url, {
      method: 'POST',
      callback: renderGoods,
      body: {
        title: form.title.value,
        description: form.description.value,
        category: form.category.value,
        units: form.units.value,
        count: form.count.value,
        discount: discont,
        price: form.price.value,
      },
      callback(err, data) {
        const message = document.querySelector('.message');
        if (err) {
          console.warn(err, data);
          message.textContent = 'Что-то пошло не так...';
        }
        message.textContent = `Заявка успешно отправлена, номер заявки ${data.id}`;
        closeModal();
      },
      headers: {
        'Content-Type': 'application/json',
      }, 
    });
  });
};

export default {
  modalControll,
  formControll,
  getGoodTotal,
};
