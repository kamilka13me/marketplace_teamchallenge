import react from '@vitejs/plugin-react-swc';
import { defineConfig, loadEnv } from 'vite';
import basicSsl from '@vitejs/plugin-basic-ssl';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    define: {
      'process.env.BASE_URL': JSON.stringify(env.BASE_URL),
      'process.env.RECAPTCHA_API_SITE_KEY': JSON.stringify(env.RECAPTCHA_API_SITE_KEY),
      'process.env.RECAPTCHA_API_SECRET_KEY': JSON.stringify(
        env.RECAPTCHA_API_SECRET_KEY,
      ),
    },
    plugins: [react(), svgr({ include: '**/*.svg?react' }), basicSsl()],
    resolve: {
      alias: [{ find: '@', replacement: '/src' }],
    },
    server: {
      port: 3000,
      host: '0.0.0.0',
      proxy: {
        '/static': {
          target: `${env.STATIC_URL}/static`,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/static/, ''),
          secure: false,
        },
        '/api': {
          target: `${env.BASE_URL}/api`,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
          secure: false,
        },
      },
    },
  };
});
