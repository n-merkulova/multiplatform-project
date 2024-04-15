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

export enum PLATFORM {
  vk = 'vk',
  ok = 'ok',
  tg = 'tg',
  iframe = 'iframe',
}

export type PlatformConfigType = {
  pathToHTML: string;
  relativePath: string;
  platform: PLATFORM;
};

const PLATFORMS: Record<PLATFORM, PlatformConfigType> = {
  [PLATFORM.iframe]: {
    platform: PLATFORM.iframe,
    relativePath: '/',
    pathToHTML: '/entries/iframe/index.html',
  },
  [PLATFORM.vk]: {
    platform: PLATFORM.vk,
    relativePath: '/vk',
    pathToHTML: '/entries/vk/index.html',
  },
  [PLATFORM.ok]: {
    platform: PLATFORM.ok,
    relativePath: '/ok',
    pathToHTML: '/entries/ok/index.html',
  },
  [PLATFORM.tg]: {
    platform: PLATFORM.tg,
    relativePath: '/tg',
    pathToHTML: '/entries/tg/index.html',
  },
};

const defineEnvVariables = (variables: string[]): Record<string, any> =>
  variables.reduce(
    (accumulator, variable) => ({
      ...accumulator,
      [`process.env.${variable}`]: JSON.stringify(process.env[variable]),
    }),
    {},
  );

// если изменен префикс, не забыть поменять paths в tsconfig.json
const generateAliases = (directories: string[], prefix = ''): AliasOptions =>
  directories.reduce(
    (accumulator, directory) => ({
      ...accumulator,
      [`${prefix}${directory}`]: path.resolve(SRC_PATH, directory),
    }),
    {},
  );

const customHistoryApiFallback = () => {
  return {
    name: 'middleware',
    apply: 'serve',
    configureServer(viteDevServer) {
      return () => {
        const devPathMaps = Object.entries(PLATFORMS).reduce(
          (acc, [platform, config]) => {
            acc[config.relativePath] = config.pathToHTML;
            return acc;
          },
          {},
        );

        viteDevServer.middlewares.use(async (req, res, next) => {
          for (const path in devPathMaps) {
            if (req.originalUrl.startsWith(path)) {
              req.url = devPathMaps[path];
            }
          }

          next();
        });
      };
    },
  };
};

export default defineConfig(({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  const IS_PROD = process.env.NODE_ENV === 'production';

  const inputBuildPathMappings = Object.fromEntries(
    Object.entries(PLATFORMS).map(([key, value]) => [
      value.platform,
      path.resolve(__dirname, value.pathToHTML),
    ]),
  );

  return {
    define: defineEnvVariables(['NODE_ENV']),
    base: '/',
    publicDir: 'static',
    resolve: {
      // TODO: заменить алиасы
      alias: generateAliases([
        'config',
        'games',
        'pages',
        'shared',
        'store',
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
        input: {
          ...inputBuildPathMappings,
        },
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
