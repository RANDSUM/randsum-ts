import { defineConfig } from 'bunup'

export default defineConfig({
  entry: ['src/index.ts'],
  outDir: 'dist',
  format: ['esm', 'cjs'],
  dts: true,
  minify: true,
  splitting: true,
  external: [],
  sourcemap: 'inline',
  target: 'node'
})
