const router = require('express').Router();
const categoryController = require('../controller/CategoryController');
const auth = require('../middleware/auth');
const authAdmin = require('../middleware/authAdmin');

router.route('/')
    .get(categoryController.index)
    .post(auth, authAdmin, categoryController.create)

router.route('/:id')
    .get(categoryController.show)
    .delete(auth, authAdmin, categoryController.delete)
    .put(auth, authAdmin, categoryController.update)


module.exports = router;