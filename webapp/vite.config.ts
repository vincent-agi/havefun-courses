import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const mobileSrc = path.resolve(__dirname, '../mobile/src');
const shims = path.resolve(__dirname, 'src/shims');
const reactNativeWeb = path.dirname(
  require.resolve('react-native-web/package.json'),
);

/**
 * La webapp réutilise tel quel le code de `../mobile` (App, écrans, navigation,
 * domaine, cas d'usage, repositories HTTP). Seuls les modules qui touchent une
 * API strictement native sont remplacés par un shim web.
 *
 * Le remplacement se fait sur le chemin *résolu* (absolu) et non sur le
 * spécificateur d'import : les imports du dossier `../mobile` sont relatifs et
 * varient selon le fichier appelant.
 */
const shimMap: Record<string, string> = {
  [path.join(mobileSrc, 'infrastructure/http/api-config.ts')]: path.join(
    shims,
    'api-config.ts',
  ),
  [path.join(mobileSrc, 'infrastructure/storage/session-storage.ts')]:
    path.join(shims, 'session-storage.ts'),
  [path.join(mobileSrc, 'infrastructure/http/http-media.repository.ts')]:
    path.join(shims, 'http-media.repository.ts'),
  [path.join(mobileSrc, 'infrastructure/http/http-pass-export.repository.ts')]:
    path.join(shims, 'http-pass-export.repository.ts'),
  [path.join(mobileSrc, 'presentation/components/PhotoUploadField.tsx')]:
    path.join(shims, 'PhotoUploadField.tsx'),
  [path.join(mobileSrc, 'presentation/screens/profile/ProfileScreen.tsx')]:
    path.join(shims, 'ProfileScreen.tsx'),
};

function mobileWebShims(): Plugin {
  return {
    name: 'mobile-web-shims',
    enforce: 'pre',
    async resolveId(source, importer, options) {
      if (source.startsWith('react-native') || source.startsWith('\0')) {
        return null;
      }
      const resolved = await this.resolve(source, importer, {
        ...options,
        skipSelf: true,
      });
      if (resolved && shimMap[resolved.id]) {
        return shimMap[resolved.id];
      }
      return null;
    },
  };
}

export default defineConfig({
  plugins: [mobileWebShims(), react()],
  resolve: {
    alias: [
      { find: /^react-native$/, replacement: reactNativeWeb },
      {
        find: /^react-native-screens$/,
        replacement: path.join(shims, 'react-native-screens.tsx'),
      },
      {
        find: /^react-native-safe-area-context$/,
        replacement: path.join(shims, 'react-native-safe-area-context.tsx'),
      },
      {
        find: /^react-native-image-picker$/,
        replacement: path.join(shims, 'empty.ts'),
      },
      {
        find: /^react-native-fs$/,
        replacement: path.join(shims, 'empty.ts'),
      },
    ],
    dedupe: ['react', 'react-dom', 'react-native-web'],
    extensions: ['.web.tsx', '.web.ts', '.tsx', '.ts', '.jsx', '.js', '.json'],
  },
  define: {
    global: 'globalThis',
    'process.env.NODE_ENV': JSON.stringify(
      process.env.NODE_ENV ?? 'development',
    ),
    __DEV__: JSON.stringify(process.env.NODE_ENV !== 'production'),
  },
  server: { port: 5173 },
});
