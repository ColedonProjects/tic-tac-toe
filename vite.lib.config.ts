import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig( {
  plugins: [
    react(),
    dts( {
      insertTypesEntry: true,
      include: [ 'src/lib/**/*' ],
      exclude: [ 'src/main.tsx', 'src/App.tsx', '**/*.test.*' ],
    } ),
  ],
  build: {
    lib: {
      entry: resolve( process.cwd(), 'src/lib/index.ts' ),
      name: 'AdvancedTicTacToe',
      formats: [ 'es', 'umd' ],
      fileName: ( format ) => `index.${ format === 'es' ? 'esm.js' : 'js' }`,
    },
    rollupOptions: {
      external: [ 'react', 'react-dom' ],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
    sourcemap: true,
    emptyOutDir: false,
  },
  resolve: {
    alias: {
      '@': resolve( process.cwd(), './src' ),
    },
  },
} ); 