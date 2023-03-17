// eslint-disable-next-line import/no-extraneous-dependencies
import typescript from 'rollup-plugin-typescript2'

// eslint-disable-next-line unicorn/prefer-module
const pkg = require('../package.json')

export default {
  input: 'src/index.ts',
  output: [
    { file: 'dist/index.cjs', format: 'cjs' },
    { file: 'dist/index.es.js', format: 'esm' }
  ],
  plugins: [
    typescript({
      tsconfigOverride: { exclude: ['src/**/*.test.ts'] }
    })
  ],
  external: Object.keys(pkg.dependencies || [])
}
