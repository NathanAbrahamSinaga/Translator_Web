const express = require('express');
const axios = require('axios');
const Translation = require('../models/Translation');
require('dotenv').config();

const router = express.Router();

router.post('/translate', async (req, res) => {
  const { originalText, fromLanguage, toLanguage } = req.body;

  try {
    const response = await axios.post(
      'https://api.llama.ai/v3.1/translate',
      { text: originalText, source: fromLanguage, target: toLanguage },
      { headers: { Authorization: `Bearer ${process.env.LLAMA_API_KEY}` } }
    );

    const translatedText = response.data.translatedText;

    const newTranslation = new Translation({
      originalText,
      translatedText,
      fromLanguage,
      toLanguage,
    });

    await newTranslation.save();

    res.json(newTranslation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
