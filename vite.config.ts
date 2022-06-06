import { defineConfig, PluginOption } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { resolve } from 'path';
import Components from 'unplugin-vue-components/vite';
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers';

const plugins: PluginOption[] = [
  vue(),
  vueJsx(),
  Components({
    dts: true,
    resolvers: [
      NaiveUiResolver()
    ]
  })
];

// https://vitejs.dev/config/
export default defineConfig({
  plugins,
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  }
});
