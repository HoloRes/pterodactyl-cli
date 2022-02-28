module.exports = {
	env: {
		es2021: true,
		node: true,
	},
	extends: [
		'airbnb',
		'airbnb-typescript',
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
		'no-bitwise': 'off',
		'no-tabs': 'off',
		'no-plusplus': ['error', {
			allowForLoopAfterthoughts: true,
		}],
		'@typescript-eslint/indent': ['error', 'tab'],
		'react/jsx-indent': ['error', 'tab'],
		'react/jsx-indent-props': ['error', 'tab'],
		'import/no-cycle': 'off',
	},
};
