module.exports = {
  testEnvironment: 'jsdom',
  preset: 'ts-jest',
  testMatch: ['<rootDir>/__tests__/**/*spec.ts?(x)'],
  globals: {
    // __DEV__: true,
    __TEST__: true,
    'ts-jest': {
      // babelConfig: 'babel.config.js',
    },
    // __VERSION__: require('./package.json').version,
    // __BROWSER__: false,
    // __GLOBAL__: false,
    // __ESM_BUNDLER__: true,
    // __ESM_BROWSER__: false,
    // __NODE_JS__: true,
    // __FEATURE_OPTIONS_API__: true,
    // __FEATURE_SUSPENSE__: true
  },
  coverageDirectory: 'coverage',
  coverageReporters: ['html', 'lcov', 'text'],
  collectCoverageFrom: ['src/**/*.{ts,js}'],
  watchPathIgnorePatterns: ['/node_modules/', '/dist/', '/.git/'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
};