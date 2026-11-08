import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
export default defineConfig(({ mode }) => {
  // GitHub Actions supplies the real Pages prefix, including custom domains.
  // Normal local development and the existing root-hosted Site keep '/'.
  const configuredBase = loadEnv(mode, '.', 'VITE_').VITE_BASE_PATH || '/';
  const base = configuredBase === '/' ? '/' : `/${configuredBase.replace(/^\/+|\/+$/g, '')}/`;
  return {
    base,
    plugins: [react(), tailwindcss()],
    build: { rollupOptions: { output: { manualChunks: {
      react: ['react', 'react-dom'],
      animation: ['gsap', 'gsap/ScrollTrigger', 'motion/react'],
    } } } },
  };
});
