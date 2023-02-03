/* eslint-disable unicorn/prefer-module */
/* eslint-disable import/no-extraneous-dependencies */
const { build } = require("esbuild")
const { dependencies, peerDependencies } = require('../package.json')
const { Generator } = require('npm-dts')

new Generator({
  entry: 'src/index',
  output: 'dist/index.d.ts',
  tsc: '-p ./tsconfig.build.json',
}).generate()

const sharedConfig = {
  entryPoints: ["src/index.ts"],
  bundle: true,
  minify: true,
  sourcemap: true,
  tsconfig: './tsconfig.build.json',
  external: [...Object.keys(dependencies || {}), ...Object.keys(peerDependencies || {})],
}

build({
  ...sharedConfig,
  platform: 'node', // for CJS
  outfile: "dist/index.js",
})

build({
  ...sharedConfig,
  outfile: "dist/index.esm.js",
  platform: 'neutral', // for ESM
  format: "esm",
})

/* eslint-enable import/no-extraneous-dependencies */

/* eslint-enable unicorn/prefer-module */
