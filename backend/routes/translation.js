const express = require('express');
const Translation = require('../models/Translation');
require('dotenv').config();

const LlamaAI = require('llamaai');
const llamaAPI = new LlamaAI(process.env.LLAMA_API_KEY);

const router = express.Router();

router.post('/translate', async (req, res) => {
  const { originalText, fromLanguage, toLanguage } = req.body;

  const apiRequestJson = {
    messages: [
      { role: "system", content: "You are a translation assistant." },
      { role: "user", content: `Translate this text from ${fromLanguage} to ${toLanguage}: ${originalText}` },
    ],
  };

  try {
    console.log("Requesting translation with payload:", JSON.stringify(apiRequestJson));
    console.log("Using API Key:", process.env.LLAMA_API_KEY);

    const response = await llamaAPI.run(apiRequestJson);

    console.log("Received response:", response);

    const translatedText = response.choices[0].message.content;

    const newTranslation = new Translation({
      originalText,
      translatedText,
      fromLanguage,
      toLanguage,
    });

    await newTranslation.save();

    res.json(newTranslation);
  } catch (error) {
    if (error.response) {
      console.error("Error response data:", error.response.data);
      console.error("Error response status:", error.response.status);
      console.error("Error response headers:", error.response.headers);
      res.status(error.response.status).json({ error: error.response.data });
    } else if (error.request) {
      console.error("Error request data:", error.request);
      res.status(500).json({ error: "No response received from translation API" });
    } else {
      console.error("Error message:", error.message);
      res.status(500).json({ error: error.message });
    }
  }
});

module.exports = router;
