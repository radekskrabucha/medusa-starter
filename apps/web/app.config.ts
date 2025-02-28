import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from '@tanstack/react-start/config'
import dotenv from 'dotenv'
import babel from 'vite-plugin-babel'
import tsConfigPaths from 'vite-tsconfig-paths'

import('./app/utils/env/client')
import('./app/utils/env/server')

dotenv.config()

const ReactCompilerConfig = {
  target: '19'
}

export default defineConfig({
  vite: {
    plugins: [
      tailwindcss(),
      tsConfigPaths({
        projects: ['./tsconfig.json']
      }),
      babel({
        filter: /\.[jt]sx?$/,
        babelConfig: {
          presets: ['@babel/preset-typescript'],
          plugins: [['babel-plugin-react-compiler', ReactCompilerConfig]]
        }
      })
    ]
  },
  server: {
    prerender: {
      routes: [],
      crawlLinks: true
    }
  }
})
