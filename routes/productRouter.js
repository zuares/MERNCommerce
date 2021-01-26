const router = require('express').Router();

const auth = require('../middleware/auth');
const authAdmin = require('../middleware/authAdmin');

const productController = require('../controller/ProductController');

router.route('/')
    .get(productController.index)
    .post(auth, authAdmin, productController.create)

router.route('/:id')
    .get(productController.show)
    .put(auth, authAdmin, productController.update)
    .delete(auth, authAdmin, productController.delete)

module.exports = router;