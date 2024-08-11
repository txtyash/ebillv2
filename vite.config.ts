import { defineConfig } from 'vite'

export default defineConfig({
  // ... other config options
  server: {
    historyApiFallback: true,
  },
})
