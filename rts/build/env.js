const exec = require('child_process').execSync;
// Branch Name
const branchName = exec('git rev-parse --abbrev-ref HEAD').toString().trim();

// command arguments
// const agrs = process.argv;
const API = {
  develop: {
    BASE_URL: '"/"',
    STATIC_URL: '""',
  },
  testing: {
    BASE_URL: '"/"',
    STATIC_URL: '""',
  },
  master: {
    BASE_URL: '"/"',
    STATIC_URL: '""',
  },
};

module.exports = API[branchName];
