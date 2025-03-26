import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'

export default [
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ignores: [
      'node_modules',
      'packages/*/dist',
      'coverage',
      '*.md',
      'docs',
      'eslint.config.js'
    ]
  },
  {
    rules: {
      'no-ternary': 'warn',
      'func-names': ['error', 'as-needed'],
      'no-restricted-exports': 'error'
    }
  }
]
