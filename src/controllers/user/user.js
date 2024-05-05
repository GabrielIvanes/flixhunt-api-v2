const jwt = require('jsonwebtoken');
require('dotenv').config();
const UserModel = require('../../models/userModel');

const getUser = (req, res) => {
  const id = req.params.id;

  UserModel.findOne({ _id: id })
    .then((user) => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

const getUserId = (req, res) => {
  const token = req.cookies.accessToken;

  if (token) {
    jwt.verify(token, process.env.SECRET_TOKEN, (err, decodedToken) => {
      if (err) {
        res.status(400).json('Token is not valid');
      } else {
        res.status(200).json({ id: decodedToken.userId });
      }
    });
  } else {
    res.status(404).json('No token found');
  }
};

module.exports = { getUser, getUserId };
