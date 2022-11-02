const fs = require('fs'); 
const path = require('path'); 
const { Sequelize, DataTypes } = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/database.js')[env]; 
const sequelize = new Sequelize(config.database, config.username, config.password, config);

const db = Object.assign({}, ...fs.readdirSync(__dirname)
    .filter((file) =>
        (file.indexOf('.') !== 0) && (file !== 'index.js')
    )
    .map((file) => {
        const model = require(path.join(__dirname, file));
        return {
            [model.name]: model.init(sequelize, DataTypes)
        };
    })
);

for (const model of Object.keys(db)) {
    typeof db[model].associate === 'function' && db[model].associate(db);
}


db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
