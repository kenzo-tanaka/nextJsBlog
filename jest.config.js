module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/__tests__"],
  setupFilesAfterEnv: ["<rootDir>/__tests__/setupTests.ts"],
  testPathIgnorePatterns: [
    "<rootDir>/__tests__/setupTests.ts",
    "<rootDir>/__tests__/tsconfig.jest.json",
    "<rootDir>/__tests__/mocks/",
  ],
  snapshotSerializers: ["enzyme-to-json/serializer"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  // https://github.com/zeit/next.js/issues/8663#issue-490553899
  globals: {
    // we must specify a custom tsconfig for tests because we need the typescript transform
    // to transform jsx into js rather than leaving it jsx such as the next build requires. you
    // can see this setting in tsconfig.jest.json -> "jsx": "react"
    "ts-jest": {
      tsconfig: "<rootDir>/__tests__/tsconfig.jest.json",
    },
  },
  collectCoverage: false,
  collectCoverageFrom: ["src/**/*"],
  coverageDirectory: "./coverage/",
  moduleNameMapper: {
    "\\.(css|less|sass|scss)$": "<rootDir>/__tests__/mocks/styleMock.js",
    "\\.(gif|ttf|eot|svg)$": "<rootDir>/__tests__/mocks/fileMock.js",
  },
};
