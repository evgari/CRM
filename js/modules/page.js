import {elems} from './getElems.js';
import modal from './modal.js';

const table = elems.table;
const getGoodTotal = modal.getGoodTotal;

const showTotal = (arr) => {
  const total = arr.reduce((a, b) => a + b.price * b.count, 0);

  document.querySelector('.header__summary span').textContent = `$${total}`;
};

const createRow = obj => {
  const row = document.createElement('tr');

  row.dataset.id = obj.id;
  row.innerHTML = `
  <td>${obj.id}</td>
  <td>${obj.title}</td>
  <td>${obj.category}</td>
  <td>${obj.units}</td>
  <td>${obj.count}</td>
  <td>${obj.price}</td>
  <td>${getGoodTotal(obj)}</td>
  <td>
    <div class="flex flex_space_between">
      <button class="add-img btn-reset">
        <svg class="add-img__icon">
          <use href="#image"></use>
        </svg>
      </button>
      <button class="add-descr btn-reset">
        <svg class="add-descr__icon">
          <use href="#description"></use>
        </svg>
      </button>
      <button class="delete btn-reset">
        <svg class="delete__icon">
          <use href="#delete"></use>
        </svg>
      </button>
    </div>
  </td>
  `;

  return row;
};

const renderGoods = arr => {
  arr.map(obj => {
    const row = createRow(obj);
    table.append(row);
  });

  console.log(arr)
  showTotal(arr);
};

const deleteControll = (arr) => {
  table.addEventListener('click', e => {
    const target = e.target;

    if (target.closest('.delete')) {
      const row = target.closest('tr');
      const targetId = row.dataset.id;

      for (const i in arr) {
        if (arr[i].id == targetId) {
          arr.splice(i, 1);
        }
      }

      row.remove();
      showTotal(arr);
    }
  });
};

export default {
  showTotal,
  createRow,
  renderGoods,
  deleteControll,
};
