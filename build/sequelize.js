const fs = require('fs');
const jsonBeautify = require('json-beautify');
const databasesConfig = require('../config/sequelize/databases');

const databases = Object.keys(databasesConfig);

const sqlInitScripts = {};
const activeDbs = {};

if (!fs.existsSync(`./config/sequelize/rc`)) {
  fs.mkdirSync(`./config/sequelize/rc`);
}

if (!fs.existsSync(`./db`)) {
  fs.mkdirSync(`./db`);
}

if (!fs.existsSync(`./db/seeders`)) {
  fs.mkdirSync(`./db/seeders`);
}

if (!fs.existsSync(`./db/migrations`)) {
  fs.mkdirSync(`./db/migrations`);
}

const sequelizeRcConfig = (dbName) => {
  const filePath = `./config/sequelize/rc/sequelizerc.${dbName}.js`;

  // eslint-disable-next-line operator-linebreak
  const configFile =
    `const path = require('path');\n`
  + `\n`
  + `module.exports = {\n`
  + `  config            : path.join('config', 'sequelize', 'databases.js'),\n`
  + `  'models-path'     : path.join('src', 'models'),\n`
  + `  'seeders-path'    : path.join('db', 'seeders', '${dbName}'),\n`
  + `  'migrations-path' : path.join('db', 'migrations', '${dbName}'),\n`
  + `};\n`;

  return fs.writeFileSync(filePath, configFile, 'utf8');
};

const sequelizeFolders = (dbName) => {
  if (!fs.existsSync(`./db/seeders/${dbName}`)) {
    fs.mkdirSync(`./db/seeders/${dbName}`);
  }

  if (!fs.existsSync(`./db/migrations/${dbName}`)) {
    fs.mkdirSync(`./db/migrations/${dbName}`);
  }
};

const makeScripts = (dbName) => {
  const configPath = `./config/sequelize/databases.js`;
  const optionsPath = `./config/sequelize/rc/sequelizerc.${dbName}.js`;
  const mainScript = `sequelize-cli --config ${configPath} --options-path ${optionsPath} --env ${dbName}`;

  return {
    createDb      : `${mainScript} db:create`,
    migrateTables : `${mainScript} db:migrate`,
    addSeeds      : `${mainScript} db:seed:all`,
  };
};

const storeScripts = (configScripts) => {
  const configPath = `./sql-scripts.json`;
  const fileContent = jsonBeautify(configScripts, null, 2, 100);
  return fs.writeFileSync(configPath, fileContent, 'utf8');
};

const createDbFolder = (dbName) => {
  const dbFileExists = fs.existsSync(`./src/models/${dbName}`);
  const dbFileIsFolder = fs.lstatSync(`./src/models/${dbName}`).isDirectory();

  if (!dbFileExists || !dbFileIsFolder) {
    fs.mkdirSync(`./src/models/${dbName}`);
  }
};

const createMigrations = (dbName) => {
  createDbFolder(dbName);
  const databaseTables = require('../config/sequelize/migrationsOrder')[dbName];

  // fs
  //   .readdirSync(`./src/models/${dbName}`)
  databaseTables.forEach((fill) => {
    const { filename: file } = fill;

    const isDirectory = fs.lstatSync(`./src/models/${dbName}/${file}`).isDirectory();
    const hasModel = fs.existsSync(`./src/models/${dbName}/${file}/${file}.model.js`);

    if (!(isDirectory && hasModel)) { return {}; }

    activeDbs[dbName] = true;

    const migrationsList = fs.readdirSync(`./db/migrations/${dbName}`);

    const modelMigrations = migrationsList
      .filter((migration) => migration.match(new RegExp(`^[0-9]*-create-${file}.js`)))
      .sort((a, b) => a.localeCompare(b))
      .reverse();

    if (!modelMigrations.length) {
      const migration = `/* eslint-disable arrow-body-style */\r\n/* eslint-disable no-unused-vars */\r\n`
        + `module.exports = {\n`
        + `  up: (queryInterface, DataTypes) => {\r`
        + `  },\n\n`
        + `  down: (queryInterface) => {\r`
        + `    return queryInterface.dropTable('${file}');\r`
        + `  },\n`
        + `};\n`;

      const currentDateTime = Date.now();
      fs.writeFileSync(`./db/migrations/${dbName}/${currentDateTime}-create-${file}.js`, migration, 'utf8');
    }

    return {};
  });

  return {};
};

module.exports = {
  init: () => {
    databases.forEach((dbName) => {
      sequelizeRcConfig(dbName);
      sequelizeFolders(dbName);
      createMigrations(dbName);
      sqlInitScripts[dbName] = makeScripts(dbName);
      if (!activeDbs[dbName]) { delete sqlInitScripts[dbName]; }
      return sqlInitScripts;
    });

    storeScripts(sqlInitScripts);
  },
};
