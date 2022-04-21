// Import class and object from Sequelize
const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');
// create the model
class Product extends Model {}
// Configure and characterize table columns
// Use ".init()" technique to initialize the model's data and configuration
Product.init(
      // define columns and rules
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        product_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.DECIMAL,
            allowNull: false,
            validate: {
                isDecimal: true
            }
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 10,
            Validate: {
                isNumeric: true
            }
        },
        category_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'category',
                key: 'id'
            }
        }
    },
    {
       sequelize,
       timestamps: false,
       freezeTableName: true,
       underscored: true,
       modelName: 'product', 
    }
);
// export the model so we can use the data in places in the app
module.exports = Product;