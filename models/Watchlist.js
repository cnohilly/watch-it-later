const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Watchlist extends Model { }

Watchlist.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            },
            unique: 'watching'
        },
        content_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: 'watching'
        },
        content_type: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: 'watching'
        },
        poster_path: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        release_year: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            validate: {
                min: 0,
                max: 2
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'watchlist'
    }
);

module.exports = Watchlist;