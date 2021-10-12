const { exec } = require('child_process');

module.exports = {
  runProcess: (command) => new Promise((resolve) => {
    exec(command, (error, stdout, stderr) => {
      resolve(stdout || stderr);
    });
  }),
};
