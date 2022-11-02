const express = require('express');
const { check } = require('express-validator');
const FileUpload =require('../MiddileWare/FileUpload');
const placesControllers = require('../controllers/post');
const checkauth = require('../MiddileWare/CheckAuth');
const router = express.Router();


module.exports = router;
