/* eslint-disable no-extend-native */
import React, { useState } from 'react';
import './App.scss';

// Із масиву повертає масив масивів з певною кількісю елементів
// Наприклад [1, 2, 3, 4, 5, 6, 7, 8, 9].chunk(3) = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
Object.defineProperty(Array.prototype, 'chunk', {
  value: function (chunkSize) {
    var temporal = [];

    for (var i = 0; i < this.length; i += chunkSize) {
      temporal.push(this.slice(i, i + chunkSize));
    }

    return temporal;
  },
});

// Приймає масив масивів (матрицю) та свапає вісь х та у
// Наприклад, transpone(  [[1, 2, 3],          [[1, 4, 7],
//                         [4, 5, 6],     =     [2, 5, 8],
//                         [7, 8, 9]] )         [3, 6, 9]]
const transpose = (matrix) =>
  matrix.reduce(($, row) => row.map((_, i) => [...($[i] || []), row[i]]), []);

// Приймає масив масивів та поєдує усі елементи у стрічку
// Наприклад joinGrid( [['м', 'а', 'с'], ['и', 'в']] ) = 'масив'
const joinGrid = (grid) => {
  const rows = [];
  grid.forEach((array) => rows.push(array.join('')));
  return rows.join('');
};

function App() {
  // Кількість стовпців (по дефолту 4)
  const [columns, setColumns] = useState(4);

  // Таблиця яка зберігає сивмоли тексту, масив масивів. Ширина таблиці (довжина рядків) задається кількісю стовпців
  // Якщо з'єднати усі символи через joinGrid(), можна отримати вихідний розшифрований текст
  const [textGrid, setTextGrid] = useState([new Array(columns)]);

  // Приймає таблицю символів тексту, повертає зашифрований текст
  const encryptGridToString = (grid) => {
    return joinGrid(transpose(grid));
  };

  // Зашифровує текст
  // Встановлює textGrid як масив масивів з шириною columns при вводі тексту
  // Якщо символів не достатньо для повної таблиці, встановлює на недостаючі місця пусту стрічку
  const handleDecryptInput = ({ target: { value } }) => {
    const array = value.split('').chunk(columns);
    if (array && array[0]) {
      while (array[array.length - 1].length < columns)
        array[array.length - 1].push('');
    }
    setTextGrid(array);
  };

  // Розшифровує текст
  // !Працює тільки з правельними вхідними даними, усі клітинки мали бути заповненими при створенні зашифрованого тексту!
  // Розраховує необхідну кількість рядків і створює масив масивів
  // Свапає х та у через transpose і результат записує в textGrid (тобто в таблицю з розшифрованим текстом)
  const handleEncryptInput = ({ target: { value } }) => {
    const array = value.split('').chunk(Math.ceil(value.length / columns));
    if (array && array[0]) {
      while (array[array.length - 1].length < Math.ceil(value.length / columns))
        array[array.length - 1].push('');
    }
    setTextGrid(transpose(array));
  };

  return (
    <div className='App'>
      <div>
        <div className='input'>
          <span>Кількість стовпців</span>
          <input
            type='text'
            onChange={(e) => setColumns(parseInt(e.target.value) || columns)}
            value={columns}
          />
        </div>
        <div className='input'>
          <span>Розшифрований текст</span>
          <input
            type='text'
            onChange={handleDecryptInput}
            value={joinGrid(textGrid)}
          />
        </div>
        <div className='input'>
          <span>Зашифрований текст</span>
          <input
            type='text'
            onChange={handleEncryptInput}
            value={encryptGridToString(textGrid)}
          />
        </div>
      </div>
      {textGrid.some((e) => e.some((c) => c === '')) ? (
        <div>
          <i>Переконайтесь що усі клітинки заповнені</i>
          <div>&nbsp;</div>
        </div>
      ) : null}
      {textGrid.some((e) => e.length !== columns) ? (
        <div>
          <i>
            Переконайтесь кількість стовпців дорівнює кількість зазначених вище
          </i>
          <div>&nbsp;</div>
        </div>
      ) : null}
      {textGrid.length > 1 ? null : (
        <div>
          <i>Текст повинет містити не менше {columns + 1} символів</i>
          <div>&nbsp;</div>
        </div>
      )}

      <table>
        {textGrid.map((row) => (
          <th>
            {row.map((char) => (
              <td>{char}</td>
            ))}
          </th>
        ))}
      </table>
    </div>
  );
}

export default App;
