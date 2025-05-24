module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: [
    '@testing-library/jest-native/extend-expect',
    './jest.setup.js',
  ],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|@react-navigation|@react-native-community|@react-native/js-polyfills|@react-native-masked-view|react-redux|@reduxjs/toolkit)',
  ],
  setupFiles: ['./node_modules/react-native-gesture-handler/jestSetup.js'],
  testMatch: ['**/__tests__/**/*.(spec|test).[jt]s?(x)?'],
  moduleNameMapper: {
    'styled-components':
      '<rootDir>/node_modules/styled-components/native/dist/styled-components.native.cjs.js',
    '.svg': '<rootDir>/__tests__/mocks/react-native-svg-transformer.mock.js',
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};
