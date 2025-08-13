// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    watch: { usePolling: true, interval: 300 }, // ← 追加
    host: true,                                  // ← LANアクセス時にも有効
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});

/*import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});*/
