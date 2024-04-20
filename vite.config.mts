import path from 'path';

import legacy from '@vitejs/plugin-legacy';
import react from '@vitejs/plugin-react';
import autoprefixer from 'autoprefixer';
import { defineConfig, loadEnv, AliasOptions } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';
import mkcert from 'vite-plugin-mkcert';
import handlebars from 'vite-plugin-handlebars';

const SRC_PATH = path.resolve(__dirname, 'src');
const BUILD_PATH = path.resolve(__dirname, 'public');
const PARTIALS_PATH = path.resolve(__dirname, 'partials');

const defineEnvVariables = (variables: string[]): Record<string, any> =>
  variables.reduce(
    (accumulator, variable) => ({
      ...accumulator,
      [`process.env.${variable}`]: JSON.stringify(process.env[variable]),
    }),
    {}
  );

const generateAliases = (directories: string[], prefix = ''): AliasOptions =>
  directories.reduce(
    (accumulator, directory) => ({
      ...accumulator,
      [`${prefix}${directory}`]: path.resolve(SRC_PATH, directory),
    }),
    {}
  );

const PLATFORM_ROUTES = [
  { platform: 'web', route: '/' },
  { platform: 'ok', route: '/ok' },
  { platform: 'tg', route: '/tg' },
  { platform: 'vk', route: '/vk' },
];

const getPlatformPath = (platform: string) => `/entries/${platform}/index.html`;

const customHistoryApiFallback = () => {
  return {
    name: 'middleware',
    apply: 'serve',
    configureServer(viteDevServer) {
      return () => {
        viteDevServer.middlewares.use(async (req, res, next) => {
          PLATFORM_ROUTES.forEach(({ route, platform }) => {
            if (req.originalUrl.startsWith(route)) {
              req.url = getPlatformPath(platform);
            }
          });

          next();
        });
      };
    },
  };
};

export default defineConfig(({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  const IS_PROD = process.env.NODE_ENV === 'production';

  return {
    define: defineEnvVariables(['NODE_ENV']),
    base: '/',
    publicDir: 'static',
    resolve: {
      alias: generateAliases([
        'components',
        'config',
        'pages',
        'stores',
        'styles',
        'types',
        'utils',
      ]),
    },
    css: {
      modules: {
        generateScopedName: IS_PROD
          ? '[hash:base64]'
          : '[name]__[local]__[hash:base64:5]',
      },
      postcss: {
        plugins: [autoprefixer()],
      },
    },
    server: {
      https: true,
    },
    build: {
      outDir: BUILD_PATH,
      assetsDir: 'static',
      sourcemap: 'hidden',
      rollupOptions: {
        input: PLATFORM_ROUTES.reduce(
          (acc, { platform }) => ({
            ...acc,
            [platform]: getPlatformPath(platform),
          }),
          {}
        ),
      },
    },
    plugins: [
      react(),
      customHistoryApiFallback(),
      createHtmlPlugin({
        minify: IS_PROD,
      }),
      handlebars({
        partialDirectory: PARTIALS_PATH,
      }),
      mkcert(),
      legacy({
        targets: IS_PROD
          ? '> 0.2%, not dead, not op_mini all, not IE 11'
          : 'last 1 chrome version, last 1 firefox version, last 1 safari version',
      }),
    ],
  };
});
