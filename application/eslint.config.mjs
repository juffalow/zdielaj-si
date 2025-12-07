import eslint from '@eslint/js';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';

export default defineConfig(
  eslint.configs.recommended,
  tseslint.configs.strict,
  tseslint.configs.stylistic,
  {
    ignores: [
      'node_modules',
      'build',
      '.react-router',
      'public/gtag.js',
    ],
  },
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  }
);
