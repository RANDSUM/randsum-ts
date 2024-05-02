import eslint from '@eslint/js'

export default [
  eslint.configs.all,
  {
    ignores: ['node_modules', 'dist', 'coverage', '*.md']
  }
]
