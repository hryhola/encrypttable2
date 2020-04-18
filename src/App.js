/* eslint-disable no-extend-native */
import React, { useState, useEffect } from 'react';
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

function arrayClone(arr) {
  var i, copy;

  if (Array.isArray(arr)) {
    copy = arr.slice(0);
    for (i = 0; i < copy.length; i++) {
      copy[i] = arrayClone(copy[i]);
    }
    return copy;
  } else if (typeof arr === 'object') {
    throw new Error('Cannot clone array containing an object!');
  } else {
    return arr;
  }
}

const alphabet = `а, б, в, г, ґ, д, е, є, ж, з, и, і, ї, й, к, л, м, н, о, п, р, с, т, у, ф, х, ц, ч, ш, щ, ь, ю, я, ,, .,  `;

const originalAlphabetArray = alphabet.split(', ');
const alphabetlGrid = originalAlphabetArray.chunk(6);

const keyWordToGrid = (key) => {
  return [
    ...key.split(''),
    ...originalAlphabetArray.filter((c) => !key.split('').includes(c)),
  ].chunk(6);
};

const withUniceChars = (c) => Array.from(new Set(c)).join('');

function App() {
  const [keyGrid, setKeyGrid] = useState(arrayClone(alphabetlGrid));
  const [keyWord, setKeyWord] = useState('');
  const [sourceText, setSourceText] = useState('');

  const isValidString = (s) =>
    s.split('').some((e) => originalAlphabetArray.includes(e));

  const handleKeyWordInput = ({ target: { value } }) => {
    if (isValidString(value.toLowerCase()))
      setKeyWord(withUniceChars(value.toLowerCase()));
  };

  const handleDecryptInput = ({ target: { value } }) => {
    if (isValidString(value.toLowerCase())) setSourceText(value.toLowerCase());
  };

  const handleEncryptInput = ({ target: { value } }) => {
    if (isValidString(value.toLowerCase()))
      setSourceText(decryptString(value.toLowerCase()));
  };

  const enctyptChar = (c) => {
    let x = -1;
    let y = -1;

    for (let row = 0; row < keyGrid.length; row++) {
      for (let column = 0; column < keyGrid[row].length; column++) {
        if (keyGrid[row][column] === c) {
          x = row;
          y = column;
        }
      }
    }

    if (x === -1 || y === -1) return null;

    if (x + 1 >= keyGrid.length) x = 0;
    else x += 1;

    return keyGrid[x][y];
  };

  const dectyptChar = (c) => {
    let x = -1;
    let y = -1;

    for (let row = 0; row < keyGrid.length; row++) {
      for (let column = 0; column < keyGrid[row].length; column++) {
        if (keyGrid[row][column] === c) {
          x = row;
          y = column;
        }
      }
    }

    if (x === -1 || y === -1) return null;

    if (x - 1 === -1) x = keyGrid.length - 1;
    else x -= 1;

    return keyGrid[x][y];
  };

  const encryptString = (s) =>
    s
      .split('')
      .map((c) => enctyptChar(c))
      .join('');

  const decryptString = (s) =>
    s
      .split('')
      .map((c) => dectyptChar(c))
      .join('');

  useEffect(() => {
    setKeyGrid(keyWordToGrid(keyWord));
  }, [keyWord]);

  return (
    <div className='App'>
      <div>
        <div className='input'>
          <span>Ключове слово</span>
          <input type='text' onChange={handleKeyWordInput} value={keyWord} />
        </div>
        <div className='input'>
          <span>Розшифрований текст</span>
          <input type='text' onChange={handleDecryptInput} value={sourceText} />
        </div>
        <div className='input'>
          <span>Зашифрований текст</span>
          <input
            type='text'
            onChange={handleEncryptInput}
            value={encryptString(sourceText)}
          />
        </div>
      </div>
      <table>
        {keyGrid.map((row) => (
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
