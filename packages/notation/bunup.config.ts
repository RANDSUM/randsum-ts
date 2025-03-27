import { defineConfig } from 'bunup'
import rootConfig from '../bunup.root.config'

export default defineConfig({
  ...rootConfig,
  external: ['@randsum/core']
})
