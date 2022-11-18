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
const form = document.querySelector('.form');
const overlay = document.querySelector('.modal');
const productsCart = document.querySelector('.products__cart');
const idField = document.querySelector('.vendor-code__id');

export default {
  goods,
  table,
  form,
  overlay,
  productsCart,
  idField,
};
