// Import class and object from Sequelize
const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');
// create the model
class ProductTag extends Model {}
// Configure and characterize table columns
// Use ".init()" technique to initialize the model's data and configuration
ProductTag.init (
      // define columns and rules
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        product_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'prodcut',
                key: 'id'
            }
        },
        tag_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'tag',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'product_tag',
    }
);
// export the model so we can use the data in places in the app
module.exports = ProductTag;