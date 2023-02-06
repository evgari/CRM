import {url, tableBody, tableTotal} from './const.js';
import {addNewGood} from './goodsControl.js';
import showModal from './modal.js';

const displayTotal = (goods) => {
  const total = goods.reduce((acc, good) => acc + good.price * good.count, 0);

  tableTotal.textContent = `$${total}`;
};

export const fetchRequest = async (url, {
  method = 'get',
  callback,
  body,
  headers,
}) => {
  try {
    const options = {
      method,
    };

    if (body) options.body = JSON.stringify(body);

    if (headers) options.headers = headers;

    const response = await fetch(url, options);

    if (response.ok) {
      const data = await response.json();
    
      if (callback) callback(null, data);
      return;
    }

    throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
  } catch (err) {
    callback(err);
  }
};

export const createRow = (good) => {
  const row = document.createElement('tr');

  row.dataset.id = good.id;
  row.innerHTML = `
    <td>${good.id}</td>
    <td>${good.title}</td>
    <td>${good.category}</td>
    <td>${good.units}</td>
    <td>${good.count}</td>
    <td>${good.price}</td>
    <td>${good.price * good.count}</td>
    <td>
      <div class="flex flex_space_between">
        <button class="controls-button controls-button_img btn-reset">
          <svg>
            <use href="#image"></use>
          </svg>
        </button>
        <button class="controls-button controls-button_edit btn-reset">
          <svg>
            <use href="#description"></use>
          </svg>
        </button>
        <button class="controls-button controls-button_delete btn-reset">
          <svg>
            <use href="#delete"></use>
          </svg>
        </button>
      </div>
    </td>
  `;

  return row;
};

export const renderGoods = (err, data) => {
  if (err) {
    console.warn(err, data);
    const h2 = document.createElement('h2');
    h2.style.color = 'red';
    h2.textContent = 'что-то пошло не так...';
    tableBody.append(h2);
    return;
  }

  displayTotal(data);

  const goods = data.map(good => {
    const row = createRow(good);
    return row;
  });

  tableBody.append(...goods);

  tableBody.addEventListener('click', ({target}) => {
    if (target.closest('.controls-button_edit')) {
      fetchRequest(`${url}/${target.closest('tr').dataset.id}`, {
        callback: showModal,
      });
    }    
  });

  return true;
};

