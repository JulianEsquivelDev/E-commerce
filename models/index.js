// Import all the models constructed so we can implement the associations
const Category = require('./Category');
const Product = require('./Product');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');


// Connect the Many-to-Many relationships 
Category.belongsTo(Category, {
    foreignKey: 'category_id',
});

Product.belongsTo(Product, {
    foreignKey: 'category_id',
});

Product.belongsToMany(Tag, {
    through: ProductTag,
    foreignKey: 'product_id',
});

Tag.belongsToMany(Product, {
    through: ProductTag,
    foreignKey: 'tag_id',
});


// export all the models
module.exports = { Product, Category, Tag, ProductTag };