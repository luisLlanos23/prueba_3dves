const fs = require('fs');
const Sequelize = require('sequelize');
const databases = require('../../config/sequelize/databases');

const databasesConfig = Object.keys(databases);
const db = {};

databasesConfig.map((dbName) => {
  const dbConnection = databases[dbName];
  const { database, username, password } = dbConnection;

  db[database] = new Sequelize(database, username, password, dbConnection);
  return db;
});

fs
  .readdirSync(__dirname)
  .filter((file) => fs.lstatSync(`${__dirname}/${file}`).isDirectory())
  .forEach((dbName) => {
    fs
      .readdirSync(`${__dirname}/${dbName}`)
      .filter((file) => {
        const isDirectory = fs.lstatSync(`${__dirname}/${dbName}/${file}`).isDirectory();
        const hasModel = fs.existsSync(`${__dirname}/${dbName}/${file}/${file}.model.js`);
        return isDirectory && hasModel;
      })
      .forEach((file) => {
        require(`${__dirname}/${dbName}/${file}/${file}.model.js`)(db[dbName], Sequelize);
        // console.log(db[dbName]);
        // const model = db[dbName].import(`${__dirname}/${dbName}/${file}/${file}.model.js`);
        // db[model.name] = model;
      });

    return {};
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;
