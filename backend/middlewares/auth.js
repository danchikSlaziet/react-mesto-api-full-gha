const jwt = require('jsonwebtoken');
require('dotenv').config();
const Error401 = require('../errors/Error401');

const { JWT_SECRET } = process.env;

const SECRET_KEY_DEV = JWT_SECRET;

const auth = (req, res, next) => {
  const { cookie } = req.headers;
  if (!cookie || !cookie.startsWith('jwt=')) {
    return next(new Error401('Необходима авторизация'));
  }
  const token = cookie.replace('jwt=', '');
  let payload;
  try {
    payload = jwt.verify(token, SECRET_KEY_DEV);
    console.log('\x1b[31m%s\x1b[0m', `
      Надо исправить. В продакшне используется тот же
      секретный ключ, что и в режиме разработки.
      `);
  } catch (err) {
    if (err.name === 'JsonWebTokenError' && err.message === 'invalid signature') {
      console.log(
        '\x1b[32m%s\x1b[0m',
        'Всё в порядке. Секретные ключи отличаются',
      );
    } else {
      console.log(
        '\x1b[33m%s\x1b[0m',
        'Что-то не так',
        err,
      );
    }
    return next(new Error401('Передан неверный jwt'));
  }
  req.user = payload;
  return next();
};

module.exports = auth;
