const express = require('express');
const mongoose = require('mongoose');
const { errors, celebrate, Joi } = require('celebrate');
const cookieParser = require('cookie-parser');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const Error404 = require('./errors/Error404');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb')
  .then(() => console.log('MongoDB подключён'))
  .catch(() => console.log('MongoDB не подключён'));

app.use(express.json());
app.use(cookieParser());
app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(/^((ftp|http|https):\/\/)?(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-/])*)?/),
  }),
}), createUser);
app.use(auth);

app.use('/users', userRouter);
app.use('/', cardRouter);
app.use('/*', (req, res, next) => {
  next(new Error404('Кривой маршрут, прочитайте документацию к API'));
});
app.use(errors());
app.use((err, req, res, next) => {
  if (err.code === 11000) {
    res.status(409).send({ message: 'Аккаунт с этой почтой уже зарегистрирован' });
  } else if (err.name === 'ValidationError') {
    res.status(400).send({ message: err.message });
  } else if (err.name === 'CastError') {
    res.status(400).send({ message: err.message });
  } else if (err.statusCode === 404 || err.statusCode === 401
    || err.statusCode === 400 || err.statusCode === 403) {
    res.status(err.statusCode).send({ message: err.message });
  } else {
    res.status(500).send({ message: 'Непредвиденная ошибка сервера' });
  }
  next();
});
app.listen(PORT, () => {
  console.log(`App listening on ${PORT}`);
});
