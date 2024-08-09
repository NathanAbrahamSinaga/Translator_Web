const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const translationRoutes = require('./routes/translation');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors({
  origin: 'https://translator-bahasa.vercel.app',
  credentials: true,
  method: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());

app.use('/api', translationRoutes);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
  .catch((error) => console.log(error.message));