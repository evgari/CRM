import {checkDiscount, displayModalTotal} from './goodsControl.js';
import loadStyle from './loadStyle.js';
import {tableBody} from './const.js';

export const showModal = async (err, data) => {
  if (err) {
    console.warn(err, data);
    const h2 = document.createElement('h2');
    h2.style.color = 'red';
    h2.textContent = 'что-то пошло не так...';
    tableBody.append(h2);
    return;
  }
  
  await loadStyle('css/modal.css');

  const title = data ? data.title : '';
  const description = data ? data.description : '';
  const category = data ? data.category : '';
  const units = data ? data.units : '';
  const count = data ? data.count : '';
  const discount = data ? data.discount : '';
  const price = data ? data.price : '';
  const total = data ? price * count : 0;

  const overlay = document.createElement('div');
  const modal = document.createElement('div');
  const close = document.createElement('button');
  const modalTitle = document.createElement('div');
  
  overlay.classList.add('modal');
  modal.classList.add('modal__wrapper');
  close.classList.add('btn-close', 'btn-reset', 'flex');
  modalTitle.classList.add('modal__header');

  close.innerHTML = `
    <svg class="btn-close__icon">
      <use href="#cross"></use>
    </svg>
  `;

  modalTitle.innerHTML = `
    <h2 class="modal__title">Добавить товар</h2>
  `;

  const form = document.createElement('form');
  form.classList.add('form');
  form.innerHTML = `
    <form class="form">
      <fieldset class="form__wrapper">
        <label class="form__label">
          <div class="form__label-text">Наименование</div>  
          <input class="form__input" type="text" name="title" required value="${title}">
        </label>
      
        <label class="form__label form__label_descr">
          <div class="form__label-text">Описание</div>              
          <textarea class="form__input textarea" name="description">${description}</textarea>
        </label>
      
        <label class="form__label">
          <div class="form__label-text">Категория</div>              
          <input class="form__input" type="text" name="category" required value="${category}">
        </label>
      
        <label class="form__label">
          <div class="form__label-text">Единицы измерения</div>
          <input class="form__input" type="text" name="units" required value="${units}">
        </label>
      
        <label class="form__label">
          <div class="form__label-text">Количество</div>              
          <input class="form__input" type="number" name="count" required value="${count}">
        </label>
      
        <div class="form__inner">
          <label for="check" class="form__label">
            <div class="form__label-text">Дисконт</div>  
          </label>
          <fieldset class="flex">
            <input id="check" class="checkbox" type="checkbox" name="discount" ${data ? 'checked' : ''}>
            <input class="form__input ${data ? '' : 'form__input_disabled'} form__input_small
              js-promo" type="text" name="promo" value="${discount}" ${data ? '' : 'disabled'}>
          </fieldset>
        </div>
      
        <label class="form__label">
          <div class="form__label-text">Цена</div>
          <input class="form__input" type="number" name="price" required value="${price}">
        </label>
      
        <p class="message form__message"></p>
        <button class="btn-fill btn-reset form__btn-image" type="button">Добавить изображение</button>
        <div class="form__image"></div>
      </fieldset>
      <div class="form__footer flex flex_space_between">
        <div class="form__summary summary">
          Итоговая стоимость:
          <span class="summary__count"> $${total}</span>
        </div>
        <button class="btn-fill btn-reset form__btn-add" type="submit">Добавить товар</button>
      </div>
    </form>
  `;

  modal.append(close, modalTitle, form);
  overlay.append(modal);

  overlay.addEventListener('click', ({target}) => {
    if (target === overlay ||
      target.closest('.btn-close')) {
        overlay.remove();
    }
  });

  document.body.append(overlay);

  checkDiscount(form);
  displayModalTotal(form);

  return {
    overlay,
    form
  }
};

export default showModal;
