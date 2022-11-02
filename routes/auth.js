const express = require('express');
const { check } = require('express-validator');
const FileUpload =require('../MiddileWare/FileUpload');
const usersController = require('../controllers/auth');

const router = express.Router();


router.post(
  '/signup',
  [
    check('name')
      .not()
      .isEmpty(),
    check('email')
      .normalizeEmail() // Test@test.com => test@test.com
      .isEmail(),
    check('password').isLength({ min: 8 })
  ],
  usersController.signup
);

router.post('/login', usersController.login);

module.exports = router;
