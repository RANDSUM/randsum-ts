/* eslint-disable import/no-extraneous-dependencies */
import dts from 'rollup-plugin-dts'
import { terser } from 'rollup-plugin-terser'
import typescript from 'rollup-plugin-typescript2'

// eslint-disable-next-line unicorn/prefer-module
const pkg = require('../package.json')

export default [
  {
    input: 'src/index.ts',
    output: [
      { file: 'dist/index.cjs', format: 'cjs', sourcemap: true },
      { file: 'dist/index.es.js', format: 'esm', sourcemap: true }
    ],
    plugins: [
      typescript({
        tsconfigOverride: {
          exclude: ['src/**/*.test.ts'],
          compilerOptions: { declaration: false }
        }
      }),
      terser()
    ],
    external: Object.keys(pkg.dependencies || [])
  },
  {
    input: 'src/index.ts',
    output: [{ file: 'dist/index.d.ts', format: 'esm' }],
    plugins: [dts.default()]
  }
]

/* eslint-enable import/no-extraneous-dependencies */
