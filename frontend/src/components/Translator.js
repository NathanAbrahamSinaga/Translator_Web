import React, { useState } from 'react';
import axios from 'axios';
import './css/Translator.css';

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
    <div className="translator-container">
      <h1>Translator</h1>
      <textarea
        value={originalText}
        onChange={(e) => setOriginalText(e.target.value)}
        placeholder="Enter text to translate"
        rows="4"
      />
      <div className="language-selectors">
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
      {error && <p className="error">{error}</p>}
      <h2>Translation</h2>
      <div className="translated-text">{translatedText}</div>
    </div>
  );
};

export default Translator;