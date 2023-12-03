import vue from '@vitejs/plugin-vue'
import ssr from 'vite-plugin-ssr/plugin'
import { UserConfig } from 'vite'

const config: UserConfig = {
  plugins: [vue(), ssr({
    prerender: true,
  })],
  server: {
    proxy: {
      '/api': 'http://localhost:8080',
    }
  }
}

export default config
