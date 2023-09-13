// eslint-disable-next-line import/no-extraneous-dependencies
import dts from 'bun-plugin-dts'

await Bun.build({
  entrypoints: ['./src/index.ts'],
  outdir: './dist',
  target: 'node',
  splitting: true,
  sourcemap: 'inline',
  minify: true,
  plugins: [dts()]
})
