import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';
import { copyFileSync, mkdirSync, existsSync, openSync, closeSync, fstatSync, readSync, ftruncateSync, writeSync } from 'fs';
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
    react({
      jsxRuntime: 'automatic',
    }),
    dts({
      include: ['src/lib'],
      rollupTypes: true,
      rollupOptions: {
        messageCallback: (message) => {
          // Suppress console messages (like the TypeScript version warning)
          // API Extractor uses TypeScript 5.8.2 which is older than our project's 5.9.3
          // This is generally harmless as API Extractor only reads .d.ts files
          if (message.messageId.startsWith('console-')) {
            message.handled = true;
          }
        },
      },
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
        const files = ['dist/index.es.js', 'dist/index.cjs'];
        files.forEach((file) => {
          let fd;
          try {
            // Open file for reading and writing - throws if doesn't exist
            // Using file descriptor eliminates TOCTOU race condition
            fd = openSync(file, 'r+');

            // Get file size
            const stats = fstatSync(fd);

            // Read entire content using file descriptor
            const buffer = Buffer.alloc(stats.size);
            readSync(fd, buffer, 0, stats.size, 0);
            const content = buffer.toString('utf-8');

            // Truncate file to 0 bytes
            ftruncateSync(fd, 0);

            // Write banner + content from position 0
            writeSync(fd, banner + content, 0, 'utf-8');
          } catch (e) {
            // File doesn't exist or can't be accessed, skip
          } finally {
            // Always close the file descriptor
            if (fd !== undefined) {
              try {
                closeSync(fd);
              } catch (e) {
                // Ignore close errors
              }
            }
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
        if (format === 'cjs') return 'index.cjs';
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
        exports: 'named',
      },
    },
    sourcemap: true,
    emptyOutDir: true,
  },
});
