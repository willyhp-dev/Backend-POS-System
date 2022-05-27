const router = require('express').Router();
const { police_check } = require('../../middlewares');
const TagController = require('./controller');
router.get('/tag',police_check('read','tag'), TagController.index);
router.get('/tag/:id',police_check('manage','all'), TagController.detail);
router.post('/tag/store',police_check('manage','all'), TagController.store);
router.patch('/update/:id',police_check('manage','all'), TagController.update);
router.delete('/delete/:id',police_check('manage','all'), TagController.destroy);

module.exports = router;
