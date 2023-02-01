import {createRow, fetchRequest} from './renderGoods.js';

import {
  url,
  tableBody,
  modalMessage,
  modalTotal,
} from './const.js';

const checkDisconst = (form) => {
  form.discont.addEventListener('change', () => {
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

const displayModalTotal = (form, modalTotal) => {
  const prop = [form.price, form.count];

  prop.forEach(el => {
    el.addEventListener('change', () => {
      modalTotal.textContent = `$${form.price.value * form.count.value}`;
    });
  });
};

export const formControl = (form, closeModal) => {
  checkDisconst(form);
  displayModalTotal(form, modalTotal);

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    fetchRequest(url, {
      method: 'post',
      body: {
        title: form.title.value,
        description: form.description.value ? 
          form.description.value : 'нет описания',
        category: form.category.value,
        units: form.units.value,
        count: form.count.value,
        discount: form.discount?.value,
        price: form.price.value,
      },
      callback(err, data) {
        if (err) {
          console.warn(err, data);
          modalMessage.textContent = 'Что-то пошло не так...';
        }

        tableBody.append(createRow(data));
        modalTotal.textContent = `$0`;
        form.promo.classList.add('form__input_disabled');
        form.promo.disabled = true;
        form.reset();
        closeModal();
      },
      headers: {
        'Content-Type': 'application/json',
      }, 
    });
  });
};
