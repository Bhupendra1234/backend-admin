const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Models = require('../models')

const signup = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({ msg: "'Invalid inputs passed, please check your data.'" })
  }
  const { name, email, password } = req.body;

  let existingUser
  try {
    existingUser = await Models.User.findOne({ where: { email: email } })
    if (existingUser) {
      res.status(422).json({ msg: "User exists already, please login instead.'" })
    }

    let hashpassword = await bcrypt.hash(password, 12);
    await Models.User.create({ name: name, email: email, password: hashpassword })
    res.status(200).json({ msg: "User signup successfully" })

  } catch (err) {
    console.log(err)
    res.status(500).json({ msg: "Could not create user,please try again" });
  }

};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let existingUser = await Models.User.findOne({ where: { email: email } })
    if (!existingUser) {
      res.status(401).json({ msg: "Invalid credentials, could not log you in." });
    }

    let IsValidPassword = await bcrypt.compare(password, existingUser.password);
    if (!IsValidPassword) {
      res.status(401).json({ msg: "Could not logged in please check your Crediential and try again" });
    }
    let token = jwt.sign({ userId: existingUser.id, email: existingUser.email }, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRE_TIME });
    res.status(200).json({ userId: existingUser.id, email: existingUser.email, token: token });
  } catch (err) {
    res.status(500).json({ msg: "Logging in failed, please try again later." });
  }

};

exports.signup = signup;
exports.login = login;
