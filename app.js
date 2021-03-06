// Создаём сервер
const express = require('express');

// Подключаем БД
const mongoose = require('mongoose');

const app = express();

// Импортируем body-parser
const bodyParser = require('body-parser');

//  Методы для работы с пакетами
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Подключаем роуты
const usersRoute = require('./routes/users');
const cardsRoute = require('./routes/cards');

//  3000 порт
const { PORT = 3000 } = process.env;

// подключаемся к серверу mongo
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// id пользователя
app.use((req, res, next) => {
  req.user = {
    _id: '62568e512082c7c0e4ba8033',
  };
  next();
});

// Подписываемся на маршруты
app.use(usersRoute);
app.use(cardsRoute);

app.use('/', (req, res) => {
  res.status(404).send({ message: 'Такого адреса по запросу не существует' });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
