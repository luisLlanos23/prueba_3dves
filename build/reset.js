const fs = require('fs');

const deleteFolderRecursive = (path) => {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach((file) => {
      const currentPath = `${path}/${file}`;

      if (fs.lstatSync(currentPath).isDirectory()) {
        deleteFolderRecursive(currentPath);
      } else {
        fs.unlinkSync(currentPath);
      }
    });

    fs.rmdirSync(path);
  }
};

if (fs.existsSync(`./config/sequelize/rc`)) {
  deleteFolderRecursive(`./config/sequelize/rc`);
}

if (fs.existsSync(`./sql-scripts.json`)) {
  fs.unlinkSync(`./sql-scripts.json`);
}
