const router = require('express').Router();
const multer = require('multer');
const os = require('os');
const ProductController = require('./controller');
const { police_check } = require('../../middlewares');
router.get('/products',police_check('read','product'), ProductController.index);
router.get('/products/:id',police_check('manage','all'), ProductController.detail);
router.post('/products/store',
    multer({ dest: os.tmpdir() }).single('image'),
    police_check('manage', 'all'),ProductController.store);
router.patch('/products/:id',police_check('manage','all'),multer({ dest: os.tmpdir() }).single('image'), ProductController.update);
router.delete('/products/:id',police_check('manage','all'),multer({ dest: os.tmpdir() }).single('image'), ProductController.destroy);

module.exports = router;
