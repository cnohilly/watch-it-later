const { Model, DataTypes } = require('sequelize');
const sequelize = require ('../config/connection');
const bcrypt = require('bcrypt');

// create our User model
class User extends Model {
    // set up method to run on instance data (per user) to check password 
    checkPassword(loginPW) {
        return bcrypt.compareSync(loginPW, this.password);
    }
}

// define table columns and configuration
User.init(
    {
        //id column
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        //user column
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        //email column
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        //password column
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [4]
            }
        }
    },
    {
       // pass in our imported sequelize connection (the direct connection to our database)
      sequelize,
      // don't automatically create createdAt/updatedAt timestamp fields
      timestamps: false,
      // don't pluralize name of database table
      freezeTableName: true,
      // use underscores instead of camel-casing (i.e. `comment_text` and not `commentText`)
      underscored: true,
      // make it so our model name stays lowercase in the database
      modelName: 'user' 
    }
);

module.exports = User;