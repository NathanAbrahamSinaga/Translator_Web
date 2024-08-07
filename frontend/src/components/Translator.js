import React, { useState } from 'react';
import axios from 'axios';

const Translator = () => {
  const [originalText, setOriginalText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [fromLanguage, setFromLanguage] = useState('id');
  const [toLanguage, setToLanguage] = useState('en');
  const [error, setError] = useState('');

  const handleTranslate = async () => {
    if (!originalText.trim()) {
      setError('Please enter text to translate.');
      return;
    }
    
    setError('');
    setTranslatedText('');

    try {
      const response = await axios.post('http://localhost:5000/api/translate', {
        originalText,
        fromLanguage,
        toLanguage,
      });
      setTranslatedText(response.data.translatedText);
    } catch (error) {
      console.error('Error translating text:', error);
      setError('Failed to translate text. Please try again.');
    }
  };

  return (
    <div>
      <h1>Translator</h1>
      <textarea
        value={originalText}
        onChange={(e) => setOriginalText(e.target.value)}
        placeholder="Enter text to translate"
        rows="4"
        cols="50"
      />
      <div>
        <label>
          From:
          <select value={fromLanguage} onChange={(e) => setFromLanguage(e.target.value)}>
            <option value="id">Indonesian</option>
            <option value="en">English</option>
            <option value="ja">Japanese</option>
          </select>
        </label>
        <label>
          To:
          <select value={toLanguage} onChange={(e) => setToLanguage(e.target.value)}>
            <option value="id">Indonesian</option>
            <option value="en">English</option>
            <option value="ja">Japanese</option>
          </select>
        </label>
      </div>
      <button onClick={handleTranslate}>Translate</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <h2>Translation</h2>
      <p>{translatedText}</p>
    </div>
  );
};

export default Translator;
