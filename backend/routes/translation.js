const express = require('express');
const axios = require('axios');
const Translation = require('../models/Translation');
require('dotenv').config();

const router = express.Router();
const { LlamaAPI } = require('llamaapi');
const llama = new LlamaAPI(process.env.LLAMA_API_KEY);

router.post('/translate', async (req, res) => {
  const { originalText, fromLanguage, toLanguage } = req.body;

  const apiRequestJson = {
    model: "llama3-70b",
    messages: [
      { role: "system", content: "You are a translation assistant." },
      { role: "user", content: `Translate this text from ${fromLanguage} to ${toLanguage}: ${originalText}` },
    ]
  };

  try {
    const response = await llama.run(apiRequestJson);
    const translatedText = response.data.choices[0].message.content;

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
