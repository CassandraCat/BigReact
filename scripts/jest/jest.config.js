const { defaults } = require('jest-config');

module.exports = {
	...defaults,
	rootDir: process.cwd(),
	modulePathIgnorePatterns: ['<rootDir>/.history'],
	moduleDirectories: ['dist/node_modules', ...defaults.moduleDirectories],
	testEnvironment: 'jsdom',
	moduleNameMapper: {
		'^scheduler$': '<rootDir>/node_modules/scheduler/unstable_mock.js'
	},
	fakeTimers: {
		enableGlobally: true,
		legacyFakeTimers: true
	},
	setupFilesAfterEnv: ['./scripts/jest/setupJest.js'],
	transform: {
		'^.+\\.(ts|tsx)$': 'ts-jest',
		'^.+\\.(js|jsx)$': 'babel-jest'
	}
};
