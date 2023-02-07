import {fetchRequest, createRow} from './renderGoods.js';
import {url, tableBody} from './const.js';

export const checkDiscount = (form) => {
  form.discount.addEventListener('change', () => {
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

export const displayModalTotal = (form) => {
  const prop = [form.price, form.count];
  const modalTotal = document.querySelector('.form__summary>span');

  prop.forEach(el => {
    el.addEventListener('change', () => {
      modalTotal.textContent = `$${form.price.value * form.count.value}`;
    });
  });
};

export const addNewGood = (form, overlay, message) => {
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
        discount: form.discount.value ?
          form.discount.value : 0,
        price: form.price.value,
      },
      callback(err, data) {
        if (err) {
          console.warn(err, data);
          message.textContent = 'Что-то пошло не так...';
        }
      
        form.reset();
        overlay.remove();
        tableBody.append(createRow(data));
      },
      headers: {
        'Content-Type': 'application/json',
      }, 
    });
  });
};
