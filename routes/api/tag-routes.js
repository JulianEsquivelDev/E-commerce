const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// Route to find all tags
router.get('/', (req, res ) => {
    // Use findAll to find all tags 
    Tag.findAll({
        attributes: ['id', 'tag_name'],
        include: [
            {
                model: Product,
                attributes: ['id', 'product_name', 'price', 'stock', 'category_id' ]
            }
        ]
    })
    .then(tagDbData => res.json(tagDbData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
// Routes to find a tag by id
router.get('/:id', (req, res) => {
    // Use findOne to only look for one value
    Tag.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'tag_name'],
        include: [
            {
                model: Product,
                attributes: ['id', 'product_name', 'price', 'category_id']
            }
        ]
    })
    .then(tagDbData => {
        if (!tagDbData) {
            res.status(404).json({ message: 'Sorry no tag found with that id'})
            return;
        }
        res.json(tagDbData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
// Router to create a new tag using .post
router.post('/', (req, res) => {
    // Use method .create to make a new tag
    Tag.create({
        tag_name: req.body.tag_name
    })
    .then(tagDbData => res.json(tagDbData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
// Router to update the tag by the id value
router.put('/:id', (req, res) => {
    // Use method update to update the tag id value
    Tag.update(req.body, {
        where: {
            id: req.params.id
        }
    })
    
    .then(tagDbData => {
        if (!tagDbData[0]) {
            res.status(404).json({ message: 'Sorry no tag found with this id' });
            return;
        }

        res.json(tagDbData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
// Router to delete a tag by the id value
router.delete('/:id', (req, res) => {
    // use destroy method to delete a tag by the id value
    Tag.destroy({
        where: {
            id: req.params.id
        }
    })

    .then(tagDbData => {
        if (!tagDbData) {
            res.status(404).json({ message: 'Sorry not tag found with this id' });
            return;
        }
        res.json(tagDbData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;