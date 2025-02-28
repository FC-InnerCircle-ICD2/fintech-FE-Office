import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@api': path.resolve(__dirname, './src/api'),
      '@components': path.resolve(__dirname, './src/components'),
      '@constants': path.resolve(__dirname, './src/constants'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@lib': path.resolve(__dirname, './src/lib'),
      '@mocks': path.resolve(__dirname, './src/mocks'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@type': path.resolve(__dirname, './src/types'),
      '@schema': path.resolve(__dirname, './src/schema'),
      '@store': path.resolve(__dirname, './src/store'),
    },
  },

  // server: {
  //   proxy: {
  //     '/proxy': {
  //       target: 'https://backoffice.pay-200.com',
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/proxy/, ''),
  //     },
  //   },
  // },
});
