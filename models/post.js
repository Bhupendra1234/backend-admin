'use strict';
const Sequelize = require('sequelize');

module.exports =
    class Post extends Sequelize.Model {
        static init(sequelize, DataTypes) {
            return super.init(
                {
                    id: {
                        allowNull: false,
                        autoIncrement: true,
                        primaryKey: true,
                        type: DataTypes.INTEGER
                    },
                    title: {
                        type: DataTypes.STRING,
                        allowNull: true
                    },
                    image: {
                        type: DataTypes.STRING,
                        allowNull: true
                    },
                    createdAt: {
                        type: DataTypes.DATE,
                        allowNull: true
                    },
                    createdBy: {
                        type: DataTypes.INTEGER,
                        allowNull: true
                    },
                    updatedAt:{
                        type: DataTypes.INTEGER,
                        allowNull:true
                    },
                    updatedBy:{
                        type: DataTypes.INTEGER,
                        allowNull:true
                    }
                },
                {
                    sequelize,
                    timestamps: false,
                    paranoid: false,
                    underscored: false,
                    tableName: 'post',
                    freezeTableName: true,
                }
            );
        }
    };
