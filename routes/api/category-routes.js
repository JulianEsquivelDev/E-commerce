
const router = require('express').Router();
const { Category, Product } = require('../../models');

// Route to find all categories
router.get('/', (req, res) => {
    // Use findAll to find all categories 
    Category.findAll({
        include: {
            model: Product,
            attributes: ['id', 'product_name', 'price', 'stock', 'category_id' ]
        }
    })
    .then(categoryDbData => {
        if (!categoryDbData) {
            res.status(404).json({ message: 'Sorry Category not found'});
            return;
        }
        res.json(categoryDbData)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    });
});

// Routes to find category by id
router.get('/:id', (req, res) => {
    // Use findOne to only look for one value
    Category.findOne({
        where: {
            id: req.params.id
        },
        include: {
            model: Product,
            attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
        }
    })
    .then(categoryDbData => {
        if (!categoryDbData) {
            res.status(404).json({ message: "Sorry Category not found"});
            return;
        }
        res.json(categoryDbData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    });
});

// Router to create a new category using .post
router.post('/', (req, res) => {
    // Use .create to make a new category
    Category.create({
        category_name: req.body.category_name
    })

    .then(categoryDbData =>
        res.json(categoryDbData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Router to update the category by the id value
router.put('/:id', (req, res) => {
    // Use method update to update the category id value
    Category.update(req.body, {
        where: {
            id: req.params.id
        }
    })
    .then(categoryDbData => {
        if (!categoryDbData) {
            res.status(404).json({ message: 'Sorry Category not found' });
            return;
        }
        res.json(categoryDbData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Router to delete a category by the id value
router.delete('/:id', (req, res) => {
    // use destroy method to delete category by the id value
    Category.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(categoryDbData => {
        if (!categoryDbData) {
            res.status(404).json({ message: 'Sorry Category not found' });
            return;
        }
        res.json(categoryDbData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;