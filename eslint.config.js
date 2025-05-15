import tseslint from '@typescript-eslint/eslint-plugin';
import configPrisma from 'eslint-config-prisma';
import prettier from 'eslint-plugin-prettier';

export default [
  {
    ignores: ['dist/**', 'node_modules/**'],
  },
  ...tseslint.configs.recommendedTypeChecked,
  configPrisma,
  {
    files: ['**/*.ts', '**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        process: 'readonly',
      },
      parserOptions: {
        project: ['./tsconfig.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      prettier,
    },
    rules: {
      'no-unused-vars': 'warn',
      'no-console': 'warn',
      '@typescript-eslint/no-unused-vars': 'error',
    },
  },
];
