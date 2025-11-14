import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';
import { copyFileSync, mkdirSync, existsSync, readFileSync, writeFileSync } from 'fs';
import packageJson from './package.json';

const { version, name, license, repository, author } = packageJson;

const banner = `/**
* ${name} v${version}
*  ${repository.url}
*
*  Copyright (c) ${author.name} <${author.email}> and project contributors.
*
*  This source code is licensed under the ${license} license found in the
*  LICENSE file in the root directory of this source tree.
*
*  Author site: ${author.url}
*/
`;

export default defineConfig({
  plugins: [
    react(),
    dts({
      include: ['src/lib'],
      rollupTypes: true,
    }),
    {
      name: 'copy-files-and-add-banner',
      closeBundle() {
        // Ensure dist directory exists
        if (!existsSync('dist')) {
          mkdirSync('dist', { recursive: true });
        }
        // Copy CSS file
        copyFileSync('src/lib/LiteYouTubeEmbed.css', 'dist/LiteYouTubeEmbed.css');
        // Copy LICENSE
        copyFileSync('LICENSE', 'dist/LICENSE');

        // Add banner to output files
        const files = ['dist/index.es.js', 'dist/index.js'];
        files.forEach((file) => {
          if (existsSync(file)) {
            const content = readFileSync(file, 'utf-8');
            writeFileSync(file, banner + content);
          }
        });
      },
    },
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/lib/index.tsx'),
      name: 'ReactLiteYouTubeEmbed',
      formats: ['es', 'cjs'],
      fileName: (format) => {
        if (format === 'es') return 'index.es.js';
        if (format === 'cjs') return 'index.js';
        return `index.${format}.js`;
      },
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'jsxRuntime',
        },
        exports: 'default',
      },
    },
    sourcemap: true,
    emptyOutDir: true,
  },
});
