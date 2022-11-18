import elems from './getElems.js';
import modal from './modal.js';

const table = elems.table;
const goods = elems.goods;
const getGoodTotal = modal.getGoodTotal;

const showTotal = arr => {
  const total = goods.reduce((a, b) => a + b.total, 0);

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

  showTotal();
};

const deleteControll = () => {
  table.addEventListener('click', e => {
    const target = e.target;

    if (target.closest('.delete')) {
      const row = target.closest('tr');
      const targetId = row.dataset.id;

      for (const i in goods) {
        if (goods[i].id == targetId) {
          goods.splice(i, 1);
        }
      }

      row.remove();
      showTotal(goods);
    }
  });
};

const generateId = () => {
  const getRandNum = () => Math.floor(Math.random() * 10);

  const arrId = [];

  for (let i = 1; i < 10; i++) {
    arrId.push(getRandNum());
  }

  return Number(arrId.join(''));
};

export default {
  showTotal,
  createRow,
  generateId,
  renderGoods,
  deleteControll,
};
