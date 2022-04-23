const router = require('express').Router();
const catRoutes = require('./category-routes');
const prodRoutes = require('./product-routes');
const tagRoutes = require('./tag-routes');

router.use('/categories', catRoutes);
router.use('/products', prodRoutes);
router.use('/tags', tagRoutes);

module.exports = router;