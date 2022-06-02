const router = require('express').Router();
const InvoiceController = require('./controller');
router.get('/Invoice', InvoiceController.show);

module.exports = router;
