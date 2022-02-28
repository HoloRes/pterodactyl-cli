module.exports = {
	env: {
		es2021: true,
		node: true,
	},
	extends: [
    'oclif',
    'oclif-typescript',
		'airbnb-base',
		'airbnb-typescript/base',
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 12,
		sourceType: 'module',
		project: './tsconfig.json'
	},
	plugins: [
		'@typescript-eslint',
	],
	rules: {
		indent: 'off',
		'no-tabs': 'off',
		'no-plusplus': ['error', {
			allowForLoopAfterthoughts: true,
		}],
		'@typescript-eslint/indent': ['error', 'tab'],
		'import/no-cycle': 'off',
	},
};
