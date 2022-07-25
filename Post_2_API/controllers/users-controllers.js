const uuid = require('uuid/v4');

const HttpError = require('../models/http-error');

const DUMMY_USERS = [
  {
    id: uuid(),
    name: 'Dave',
    password: 'password'
  },
  {
    id: uuid(),
    name: 'John',
    password: 'password'
  }
];

const getUsers = (req, res, next) => {
  res.json({ users: DUMMY_USERS });
};

const signup = (req, res, next) => {
  const { name, password } = req.body;

  const hasUser = DUMMY_USERS.find(u => u.name === name);
  if (hasUser) {
    throw new HttpError('Could not create user, user already exists.', 422);
  }

  const createdUser = {
    id: uuid(),
    name, // name: name
    password
  };

  DUMMY_USERS.push(createdUser);

  res.status(201).json({user: createdUser});
};

const login = (req, res, next) => {
  const { name, password } = req.body;

  const identifiedUser = DUMMY_USERS.find(u => u.name === name);
  if (!identifiedUser || identifiedUser.password !== password) {
    throw new HttpError('Could not identify user, credentials seem to be wrong.', 401);
  }

  res.json({message: 'Logged in!'});
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
