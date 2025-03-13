await Bun.build({
  entrypoints: ['./src/index.ts'],
  outdir: './dist',
  target: 'node',
  splitting: true,
  sourcemap: 'inline'
})
