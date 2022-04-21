// Import class and object from Sequelize
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
// create the model
class Tag extends Model {}
// Configure and characterize table columns
// Use ".init()" technique to initialize the model's data and configuration
Tag.init(
    // define columns and rules
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        tag_name: {
            type: DataTypes.STRING
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'tag',
    }
);
// export the model so we can use the data in places in the app
module.exports = Tag;