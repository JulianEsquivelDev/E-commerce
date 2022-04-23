const categorySeeds = require('./category-seeds');
const productSeeds = require('./product-seeds');
const tagSeeds = require('./tag-seeds');
const productTagSeeds = require('./product-tag-seeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
    await sequelize.sync({ force: true });
    console.log('\n----- DATABASE SYNCED -----\n');

    await categorySeeds();
    console.log('\n----- CATEGORIES SEEDED -----\n')

    await productSeeds();
    console.log('\n----- PRODUCTS SEEDED -----\n');

    await tagSeeds();
    console.log('\n----- TAGS SEEDED -----\n');

    await productTagSeeds();
    console.log('\n----- PRODUCT TAGS SEEDED -----\n')

    process.exit(0);
};

seedAll();