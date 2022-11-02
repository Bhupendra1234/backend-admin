'use strict';
const Sequelize = require('sequelize');

module.exports =
    class User extends Sequelize.Model {
        static init(sequelize, DataTypes) {
            return super.init(
                {
                    id: {
                        allowNull: false,
                        autoIncrement: true,
                        primaryKey: true,
                        type: DataTypes.INTEGER
                    },
                    name: {
                        type: DataTypes.STRING,
                        allowNull: true
                    },
                    email: {
                        type: DataTypes.STRING,
                        allowNull: true,
                        unique: {
                            args: true,
                            msg: 'Oops. Looks like someone already have an account with this email. Please try again with another email.',
                            fields: [sequelize.fn('lower', sequelize.col('email'))]
                        }
                    },
                    password: {
                        type: DataTypes.STRING
                        // allowNull: false
                    },
                },
                {
                    sequelize,
                    timestamps: false,
                    underscored: true,
                    tableName: 'user',
                    freezeTableName: true,
                }
            );
        }
    };
