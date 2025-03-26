import { defineConfig } from 'bunup'

const config: ReturnType<typeof defineConfig> = defineConfig({
  entry: ['src/index.ts'],
  outDir: 'dist',
  format: ['esm', 'cjs'],
  dts: true,
  minify: true,
  splitting: true,
  external: ['uuid'],
  sourcemap: 'inline',
  target: 'node'
})

export default config
