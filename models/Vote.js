const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Vote extends Model { }

Vote.init(
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
      unique: 'vote'
    },
    content_type: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: 'vote'
    },
    content_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: 'vote'
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'vote'
  }
);


module.exports = Vote;