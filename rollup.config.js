import * as path from 'node:path'

import pluginCommonjs from '@rollup/plugin-commonjs'
import pluginNodeResolve from '@rollup/plugin-node-resolve'
import pluginTypescript from '@rollup/plugin-typescript'
import terser from '@rollup/plugin-terser'
import { readFileSync } from 'node:fs'

// Use import.meta.url to make the path relative to the current source
// file instead of process.cwd(). For more information:
// https://nodejs.org/docs/latest-v16.x/api/esm.html#importmetaurl
const pkg = JSON.parse(readFileSync(new URL('./package.json', import.meta.url)))

const moduleName = pkg.name.replace(/^@.*\//, '')
const inputFileName = 'src/index.ts'
const { author } = pkg
const banner = `
  /**
   * @license
   * author: ${author}
   * ${moduleName}.js v${pkg.version}
   * Released under the ${pkg.license} license.
   */
`
const plugins = [
  pluginTypescript({
    tsconfig: './tsconfig.build.json'
  }),
  pluginCommonjs({
    extensions: ['.js', '.ts']
  })
]

const external = [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.devDependencies || {})
]

export default [
  {
    input: inputFileName,
    output: [
      {
        name: moduleName,
        file: pkg.browser,
        format: 'iife',
        sourcemap: 'inline',
        banner
      },
      {
        name: moduleName,
        file: pkg.browser.replace('.js', '.min.js'),
        format: 'iife',
        sourcemap: 'inline',
        banner,
        plugins: [terser({ sourceMap: true })]
      }
    ],
    plugins: [
      ...plugins,
      pluginNodeResolve({
        browser: true
      })
    ]
  },

  // ES
  {
    input: inputFileName,
    output: [
      {
        file: pkg.module,
        format: 'es',
        sourcemap: 'inline',
        banner,
        exports: 'named'
      }
    ],
    external,
    plugins: [
      ...plugins,
      pluginNodeResolve({
        browser: false
      })
    ]
  },

  // CommonJS
  {
    input: inputFileName,
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        sourcemap: 'inline',
        banner,
        exports: 'default'
      }
    ],
    external,
    plugins: [
      ...plugins,
      pluginNodeResolve({
        browser: false
      })
    ]
  }
]
