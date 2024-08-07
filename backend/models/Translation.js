const mongoose = require('mongoose');

const TranslationSchema = new mongoose.Schema({
  originalText: { type: String, required: true },
  translatedText: { type: String, required: true },
  fromLanguage: { type: String, required: true },
  toLanguage: { type: String, required: true },
});

module.exports = mongoose.model('Translation', TranslationSchema);
