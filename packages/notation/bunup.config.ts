import { defineConfig } from 'bunup'

const config: ReturnType<typeof defineConfig> = defineConfig({
  entry: ['src/index.ts'],
  outDir: 'dist',
  format: ['esm', 'cjs'],
  dts: true,
  minify: true,
  splitting: true,
  external: ['@randsum/core']
})

export default config
