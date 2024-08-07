import React, { useState } from 'react';
import axios from 'axios';

const Translator = () => {
  const [originalText, setOriginalText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [fromLanguage, setFromLanguage] = useState('id');
  const [toLanguage, setToLanguage] = useState('en');

  const handleTranslate = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/translate', {
        originalText,
        fromLanguage,
        toLanguage,
      });
      setTranslatedText(response.data.translatedText);
    } catch (error) {
      console.error('Error translating text:', error);
    }
  };

  return (
    <div>
      <h1>Translator</h1>
      <textarea
        value={originalText}
        onChange={(e) => setOriginalText(e.target.value)}
        placeholder="Enter text to translate"
      />
      <select value={fromLanguage} onChange={(e) => setFromLanguage(e.target.value)}>
        <option value="id">Indonesian</option>
        <option value="en">English</option>
        <option value="ja">Japanese</option>
      </select>
      <select value={toLanguage} onChange={(e) => setToLanguage(e.target.value)}>
        <option value="id">Indonesian</option>
        <option value="en">English</option>
        <option value="ja">Japanese</option>
      </select>
      <button onClick={handleTranslate}>Translate</button>
      <h2>Translation</h2>
      <p>{translatedText}</p>
    </div>
  );
};

export default Translator;
