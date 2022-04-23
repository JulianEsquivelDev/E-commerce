const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// Router to find all products
router.get('/', (req, res) => {
    // Use findAll method to find all Products
    Product.findAll({
        attributes: ['id', 'product_name', 'price', 'stock'],
        include: [{
            model: Category,
            attributes: ['category_name']
        },
        {
            model: Tag,
            attributes: ['tag_name']
        }
    ]
    })
    .then(productDbData => res.json(productDbData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Router to get product by id
router.get('/:id', (req, res) => {
    // Use method fineOne to find product by id
    Product.findOne({
        where: {
            id: req.params.id
        },

        attributes: ['id', 'product_name', 'price', 'stock'],
        include: [{
            model: Category,
            attributes: ['category_name']
        },
    {
        model: Tag,
        attributes: ['tag_name']
    }
]
    })
    .then(productDbData => {
        if (!productDbData) {
            res.status(404).json({ message: 'Sorry product with the given id was not found' });
            return;
        }
        res.json(productDbData);
    })

    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Router to create a new product
router.post('/', (req, res) => {
    // use method create to create a new product
    Product.create({
        product_name: req.body.product_name,
        price: req.body.price,
        stock: req.body.stock,
        category_id: req.body.category_id,
        tagIds: req.body.tagIds
    })
    .then((product) => {
        if (req.body.tagIds.length) {
            const prodTagIdArr = req.body.tagIds.map((tag_id) => {
                return {
                    product_id: product.id,
                    tag_id,
                };
            });

            return ProductTag.bulkCreate(prodTagIdArr);

        }
        res.status(200).json(product);
    })
    .then((prodTagId) => res.status(200).json(prodTagId))
    .catch((err) => {
        console.log(err);
        res.status(400).json(err);
    });
});

// Router to update the product by the id value
router.put('/:id', (req, res) => {
    // Use method update to update the product id value
    Product.update(req.body, {
        where: {
            id: req.body.id,
        },
    })
    
    .then((product) => {
        return ProductTag.findAll({ where: { product_id: req.params.id} });
    })

    .then((productTags) => {
        const currentProdTagId = productTags.map(({ tag_id }) => tag_id);
        const newProdTagId = req.body.tagIds
        .filter((tag_id) => !currentProdTagId.includes(tag_id))
        .map((tag_id) => {
            return {
                product_id: req.params.id,
                tag_id,
            };
        });
        const removeProdTag = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

        return Promise.all([
            ProductTag.destroy({ where: { id: removeProdTag } }),
            ProductTag.bulkCreate(newProdTagId),
        ]);
    })

        .then((newProductTag) => res.json(newProductTag))
        .catch((err) => {
            res.status(400).json(err);
        });
});

// Router to delete a product tag by the id
router.delete('/:id', (req, res) => {
    // use destroy method to delete a product by the id value
    Product.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(productDbData => {
        if (!productDbData) {
            res.status(404).json({ message: 'Sorry no product with this id was found' });
            return;
        }
        res.json(productDbData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;