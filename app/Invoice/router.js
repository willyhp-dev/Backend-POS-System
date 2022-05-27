const router = require('express').Router();
const InvoiceController = require('./controller');
router.get('/show', InvoiceController.show);

module.exports = router;
