const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
require('dotenv').config();
const emailValidator = require('deep-email-validator');

const UserModel = require('../../models/user');

const maxAge = 3 * 24 * 60 * 60 * 1000;

async function isEmailValid(email) {
  return await emailValidator.validate(email);
}

const signUp = async (req, res) => {
  const { username, email, password } = req.body;

  const { valid, reason, validators } = await isEmailValid(email);

  if (!valid) {
    return res.status(400).json({
      message: 'Please provide a valid email address.',
      reason: validators[reason].reason,
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  UserModel.init().then(async () => {
    const userModel = await new UserModel({
      email,
      username,
      password: hashedPassword,
      image: `${Math.floor(Math.random() * 15) + 1}.png`,
    });
    userModel
      .save()
      .then((user) => res.status(201).json(user))
      .catch((err) =>
        res
          .status(400)
          .json({ message: 'An account with this email already exist.' })
      );
  });
};

const signIn = async (req, res) => {
  const { email, password } = req.body;

  if (email && password) {
    UserModel.findOne({ email: email })
      .then((user) => {
        bcrypt.compare(password, user.password).then((valid) => {
          if (valid) {
            const xsrfToken = crypto.randomBytes(64).toString('hex');
            const token = jwt.sign(
              { userId: user._id, xsrfToken: xsrfToken },
              process.env.SECRET_TOKEN,
              {
                expiresIn: maxAge,
              }
            );
            res.cookie('accessToken', token, { httpOnly: true, maxAge });
            return res.json({
              user: user._id,
              xsrfToken: xsrfToken,
            });
          } else {
            return res
              .status(400)
              .json({ message: 'Invalid email or password.' });
          }
        });
      })
      .catch((err) => {
        return res.status(400).json({
          message: 'No account with this email address.',
          err: err,
        });
      });
  } else {
    res.status(404).json({ message: 'Missing the email or the password.' });
  }
};

const logout = (req, res) => {
  res.clearCookie('accessToken');
  res.end();
};

module.exports = { signIn, signUp, logout };
