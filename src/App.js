/* eslint-disable no-extend-native */
import React, { useState } from 'react';
import './App.scss';

const alphabet = `а, б, в, г, ґ, д, е, є, ж, з, и, і, ї, й, к, л, м, н, о, п, р, с, т, у, ф, х, ц, ч, ш, щ, ь, ю, я,  `;

const originalAlphabetArray = alphabet.split(', ');

let [a, b, c] = originalAlphabetArray;

const encryptedAlphabetArray = [...originalAlphabetArray];

encryptedAlphabetArray.shift();
encryptedAlphabetArray.shift();
encryptedAlphabetArray.shift();
encryptedAlphabetArray.push(a);
encryptedAlphabetArray.push(b);
encryptedAlphabetArray.push(c);

const enctyptChar = (c) => {
  const id = originalAlphabetArray.findIndex((e) => e === c);
  return encryptedAlphabetArray[id];
};

const dectyptChar = (c) => {
  const id = encryptedAlphabetArray.findIndex((e) => e === c);
  return originalAlphabetArray[id];
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

function App() {
  const [sourceText, setSourceText] = useState('');
  const [idVisibleError, setIdVisibleError] = useState('');

  const handleDecryptInput = ({ target: { value } }) => {
    value.split('').some((e) => !originalAlphabetArray.includes(e))
      ? setIdVisibleError(true)
      : setIdVisibleError(false);
    setSourceText(value.toLowerCase());
  };

  const handleEncryptInput = ({ target: { value } }) => {
    value.split('').some((e) => !originalAlphabetArray.includes(e))
      ? setIdVisibleError(true)
      : setIdVisibleError(false);
    setSourceText(decryptString(value));
  };

  return (
    <div className='App'>
      <div>
        <div className='input'>
          <span>Розшифрований текст</span>
          <input type='text' onChange={handleDecryptInput} value={sourceText} />
        </div>
        <div className='input'>
          <span>Зашифрований текст текст</span>
          <input
            type='text'
            onChange={handleEncryptInput}
            value={encryptString(sourceText)}
          />
        </div>
      </div>
      {idVisibleError ? (
        <div>
          <i>Вводьте лише букви українстького алфавіту</i>
        </div>
      ) : null}
    </div>
  );
}

export default App;
