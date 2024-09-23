
const express = require('express');
const router = express.Router();
const Controller = require('../Controllers/Controllers');
const upload = require('../Config/fileUpload');

router.get('/', Controller.DefaultController);
router.post('/addData',upload.single('fileUp'), Controller.AddMovieContoller);
router.get('/editData/:id', Controller.EditMovieController);
router.post('/updateData/:id', upload.single('fileUp'), Controller.UpdateMovieController);
router.get('/deleteData/:id', Controller.DeleteMovieController);
module.exports = router;








