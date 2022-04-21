// Import class and object from Sequelize
const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');
// create the model
class Category extends Model {}
// Configure and characterize table columns
// Use ".init()" technique to initialize the model's data and configuration
Category.init(
      // define columns and rules
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        category_name: {
            type: DataTypes.STRING,
            allowNull: false
        }
        },
        {
            sequelize,
            timestamps: false,
            freezeTableName: true,
            underscored: true,
            modelName: 'category',
        }
);
// export the model so we can use the data in places in the app
module.exports = Category;