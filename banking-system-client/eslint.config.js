import js from '@eslint/js';
import tsEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import prettierConfig from 'eslint-config-prettier';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';

export default [
  {
    ignores: ['dist', 'node_modules'],
    files: ['**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.browser,
      parser: tsParser,
    },
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      '@typescript-eslint': tsEslint,
      'jsx-a11y': jsxA11y,
      prettier: require('eslint-plugin-prettier'),
    },
    rules: {
      ...js.configs.recommended.rules,
      ...tsEslint.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      '@typescript-eslint/no-unused-vars': 'warn',
      'jsx-a11y/no-static-element-interactions': 'warn',
      semi: ['error', 'always'],
      'prettier/prettier': 'error',
    },
  },
];
