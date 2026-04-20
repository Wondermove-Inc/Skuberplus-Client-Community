module.exports = {
  ...require("@k-lens/jest").monorepoPackageConfig(__dirname).configForNode,
  moduleNameMapper: {
    "^@k-lens/kube-api$": "<rootDir>/index.ts",
  },
};
