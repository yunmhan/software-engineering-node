const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/tuiter');

const express = require('express');
const app = express();

app.get('/hello', (req, res) =>
  res.send('Hello World!'));

const PORT = 4000;
app.listen(PORT);
