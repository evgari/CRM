'use strict';
const goods = [
  {
    id: 246016548,
    title: 'Навигационная система Soundmax',
    category: 'Техника для дома',
    units: 'шт',
    count: 5,
    price: 100,
    total: 500,
  },
  {
    id: 937295527,
    title: 'Настольная игра “На 4-х ногах”',
    category: 'Настольные игры',
    units: 'шт',
    count: 12,
    price: 14,
    total: 168,
  },
  {
    id: 253842678,
    title: 'Смартфон Xiaomi 11T 8/128GB',
    category: 'Смартфоны',
    units: 'шт',
    count: 4,
    price: 400,
    total: 1600,
  },
  {
    id: 296378448,
    title: 'Радиоуправляемый автомобиль Cheetan',
    category: 'Игрушки',
    units: 'шт',
    count: 1,
    price: 60,
    total: 60,
  },
  {
    id: 216374586,
    title: 'Витая пара PROConnect 01-0043-3-25',
    category: 'Кабели',
    units: 'шт',
    count: 9,
    price: 10,
    total: 90,
  },
];

const table = document.querySelector('.table__body');
const tableBody = document.querySelector('.table__body');

const createRow = (obj) => {
  const row = document.createElement('tr');
  row.innerHTML = `
  <td>${obj.id}</td>
  <td>${obj.title}</td>
  <td>${obj.category}</td>
  <td>${obj.units}</td>
  <td>${obj.count}</td>
  <td>${obj.price}</td>
  <td>${obj.total}</td>
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

const renderGoods = (arr) => {
  goods.map(obj => {
    const row = createRow(obj);
    row.dataset.id = obj.id;
    table.append(row);
  });
};

tableBody.addEventListener('click', e => {
  const target = e.target;

  if (target.closest('.delete')) {
    const row = target.closest('tr');
    const targetId = +row.dataset.id;

    for (const i in goods) {
      if (goods[i].id === targetId) {
        goods.splice(i, 1);
      }
    }

    row.remove();
    console.log(goods);
  }
});

renderGoods(goods);
