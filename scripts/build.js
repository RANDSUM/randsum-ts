/* eslint-disable import/no-extraneous-dependencies */
// eslint-disable-next-line import/no-named-default
import { default as dts } from 'rollup-plugin-dts'
import { terser } from 'rollup-plugin-terser'
import typescript from 'rollup-plugin-typescript2'

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
    ]
  },
  {
    input: 'src/index.ts',
    output: [{ file: 'dist/index.d.ts', format: 'esm' }],
    plugins: [dts.default()]
  }
]
/* eslint-enable import/no-extraneous-dependencies */
