const express = require('express');
const { check } = require('express-validator');
const FileUpload =require('../middileWare/FileUpload');
const postControllers = require('../controllers/post');
const checkauth = require('../middileWare/CheckAuth');
const router = express.Router();

// router.use(checkauth);
router.get('/all', postControllers.getAllPost);



router.post(
  '/create',FileUpload.single('image'),
  [
    check('title')
      .not()
      .isEmpty(),
    check('description').isLength({ min: 5 }),
  ],
  postControllers.createPost
);

router.put(
    '/:pid',
    FileUpload.single('image'),
    [
      check('title')
        .not()
        .isEmpty(),
      check('description').isLength({ min: 5 })
    ],
    postControllers.updatePost
  );

router.delete('/delete/:pid', postControllers.deletePost);

module.exports = router;
