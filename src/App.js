/* eslint-disable no-extend-native */
import React, { useState } from 'react';
import './App.scss';

Object.defineProperty(Array.prototype, 'chunk', {
  value: function (chunkSize) {
    var temporal = [];

    for (var i = 0; i < this.length; i += chunkSize) {
      temporal.push(this.slice(i, i + chunkSize));
    }

    return temporal;
  },
});

function App() {
  const [columns, setColumns] = useState(4);
  const [encryptedGrid, setEncryptedGrid] = useState([[]]);

  const transpose = (matrix) =>
    matrix.reduce(($, row) => row.map((_, i) => [...($[i] || []), row[i]]), []);

  const encryptGridToString = (grid) => {
    return joinGrid(transpose(grid));
  };

  // JOIN TABLE TO STRING
  const joinGrid = (grid) => {
    const rows = [];
    grid.forEach((array) => rows.push(array.join('')));
    return rows.join('');
  };

  const handleDecryptInput = ({ target: { value } }) => {
    const array = value.split('').chunk(columns);
    if (array && array[0]) {
      while (array[array.length - 1].length < columns)
        array[array.length - 1].push('');
    }
    setEncryptedGrid(array);
  };

  const handleEncryptInput = ({ target: { value } }) => {
    const array = value.split('').chunk(Math.ceil(value.length / columns));
    if (array && array[0]) {
      while (array[array.length - 1].length < Math.ceil(value.length / columns))
        array[array.length - 1].push('');
    }
    setEncryptedGrid(transpose(array));
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
          <span>Відкрий || Розшифрований текст</span>
          <input
            type='text'
            onChange={handleDecryptInput}
            value={joinGrid(encryptedGrid)}
          />
        </div>
        <div className='input'>
          <span>Зашифрований текст</span>
          <input
            type='text'
            onChange={handleEncryptInput}
            value={encryptGridToString(encryptedGrid)}
          />
        </div>
      </div>
      {encryptedGrid.some((e) => e.some((c) => c === '')) ? (
        <div>
          <i style={{ fontSize: '0.60em' }}>
            Переконайтесь що усі клітинки заповнені
          </i>
        </div>
      ) : null}
      {encryptedGrid.length > 1 ? null : (
        <div>
          <i style={{ fontSize: '0.60em' }}>
            Текст повинет містити не менше {columns + 1} символів
          </i>
        </div>
      )}

      <table>
        {encryptedGrid.map((row) => (
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
