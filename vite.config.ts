import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import path from "path"

// 1. Tell Vite to auto-discover and load every single image inside your assets folder


// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  // Shopify serves theme assets from its own asset path; keep emitted URLs relative.
  base: './',
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
  ],
  resolve: {
    dedupe: ['react', 'react-dom'],
    alias: {
      '@': path.resolve(__dirname, './src'),
      react: path.resolve(__dirname, './node_modules/react'),
      'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
    },
  },
  logLevel: 'info',
  define: {
    // Ensure transitive browser bundles never crash on free `process` references.
    process: `({
      env: {},
      argv: [],
      version: '',
      browser: true,
      platform: 'browser',
      cwd: function () { return '/'; },
      emit: function () {},
      nextTick: function (cb) {
        return Promise.resolve().then(cb);
      }
    })`,
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
  },
  build: {
    minify: mode !== 'development',
    // Output the compiled bundles directly into Shopify's assets folder
    outDir: path.resolve(__dirname, './assets'),
    emptyOutDir: false, // Prevents wiping out other native theme files
    chunkSizeWarningLimit: 3000,
    rollupOptions: {
      // Set our source file entrypoint
      input: path.resolve(__dirname, './src/main.tsx'),
      output: {
        format: 'iife',
        name: 'ZuzThemeBundle',
        banner: `var process = globalThis.process || {
  env: {},
  argv: [],
  version: '',
  browser: true,
  platform: 'browser',
  cwd: function () { return '/'; },
  emit: function () {},
  nextTick: function (cb) {
    return Promise.resolve().then(cb);
  }
};`,
        // Force static names so Liquid templates can easily locate them
        entryFileNames: 'zuzjs-theme.js',
        assetFileNames: (assetInfo) => {
          // Keep CSS stable for Liquid include, fingerprint all other assets.
          const candidateNames = [
            ...(assetInfo.names ?? []),
            ...(assetInfo.originalFileNames ?? []),
          ]

          if (candidateNames.some((name) => name.endsWith('.css'))) {
            return 'zuzjs-theme.css'
          }

          // return 'zuzjs-theme-[name]-[hash][extname]'
          return '[name]-[hash][extname]'
        },
      },
    },
  },
}))
