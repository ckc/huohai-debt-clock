import { defineConfig } from 'vite'

export default defineConfig(async () => {
  const { default: react } = await import('@vitejs/plugin-react')
  return {
    plugins: [react()],
    server: {
      host: '127.0.0.1',
      port: 3000,
      strictPort: true
    },
    build: {
      sourcemap: false
    }
  }
})
