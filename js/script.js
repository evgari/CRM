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

const addGoodData = good => {
  goods.push(good);
};

const showTotal = () => {
  const total = goods.reduce((a, b) => a + b.total, 0);

  document.querySelector('.header__summary span').textContent = `$${total}`;
};

const table = document.querySelector('.table__body');
const form = document.querySelector('.form');
const overlay = document.querySelector('.modal');
const productsCart = document.querySelector('.products__cart');
const idField = document.querySelector('.vendor-code__id');

const getGoodTotal = obj => {
  const total = obj.price * obj.count;

  return total;
};

const createRow = (obj) => {
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

const renderGoods = (arr) => {
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
      const targetId = +row.dataset.id;

      for (const i in goods) {
        if (goods[i].id === targetId) {
          goods.splice(i, 1);
        }
      }

      row.remove();
      showTotal();
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

const modalControll = (overlay, productsCart, idField) => {
  const openModal = () => {
    overlay.classList.add('open');

    idField.textContent = generateId();
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
    const target = e.target;
    const promoInput = target.nextElementSibling;

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
  table.append(createRow(good));
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

    addGoodPage(newGood, table);
    addGoodData(newGood);
    form.reset();
    closeModal();

    showTotal();
  });
};

const {closeModal} = modalControll(overlay, productsCart, idField);

renderGoods(goods);
formControll(form, table, closeModal);
deleteControll();
