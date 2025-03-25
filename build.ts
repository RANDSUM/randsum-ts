import dts from 'bun-plugin-dts'

async function build() {
  try {
    const results = await Bun.build({
      entrypoints: ['./src/index.ts'],
      outdir: './dist',
      sourcemap: 'inline',
      minify: true,
      splitting: true,
      plugins: [dts()]
    })

    if (!results.success) {
      throw new Error(results.logs.join('\n'))
    }

    console.log(`Successfully compiled ${results.outputs.length} files`)
  } catch (error) {
    console.error('Build failed:', error)
    process.exit(1)
  }
}

build()

export {}
