import { defineConfig } from 'bunup'

export default defineConfig({
  entry: ['src/index.ts'],
  outDir: 'dist',
  format: ['esm', 'cjs'],
  dts: true,
  minify: true,
  clean: true,
  splitting: true,
  external: ['@randsum/notation', '@randsum/core'],
  sourcemap: 'inline',
  target: 'node'
})
