const {
  configForNode: { coverageThreshold, ...config },
} = require("@k-lens/jest").monorepoPackageConfig(__dirname);

module.exports = config;
