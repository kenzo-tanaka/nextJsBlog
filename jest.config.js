module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  testPathIgnorePatterns: ["<rootDir>/functions/*"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  // https://github.com/zeit/next.js/issues/8663#issue-490553899
  globals: {
    "ts-jest": {
      tsconfig: "<rootDir>/tsconfig.jest.json",
    },
  },
};
