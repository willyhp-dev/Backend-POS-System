const router = require('express').Router();
const { police_check } = require('../../middlewares');
const CategoryController = require('./controller');
router.get('/category',police_check('read','category'), CategoryController.index);
router.get('/category/detail/:id',police_check('detail','category'), CategoryController.detail);
router.post('/category/store',police_check('create','category'), CategoryController.store);
router.patch('/category/edit/:id',police_check('update','category') ,CategoryController.update);
router.delete('/category/delete/:id',police_check('delete','category'), CategoryController.destroy);

module.exports = router;