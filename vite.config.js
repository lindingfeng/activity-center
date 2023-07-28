import path from 'path'
import { defineConfig } from 'vite'
import packages from './package.json'
import vue2 from '@vitejs/plugin-vue2'
import eslint from 'vite-plugin-eslint'
import legacy from '@vitejs/plugin-legacy'
import vueJsx from '@vitejs/plugin-vue2-jsx'
import visualizer from 'rollup-plugin-visualizer'
import vitePluginImport from 'vite-plugin-babel-import'
import DefineOptions from 'unplugin-vue-define-options/vite'

function resolve (dir = '', baseDir) {
  return path.join(baseDir || process.cwd(), dir) 
}

const fileTypeList = [
  { reg: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/, dir: 'media' },
  { reg: /\.(png|jpe?g|gif|svg)(\?.*)?$/, dir: 'img' },
  { reg: /\.(woff2?|eot|ttf|otf)(\?.*)?$/, dir: 'fonts' },
  { reg: /\.css$/, dir: 'css' },
  { reg: /\.js$/, dir: 'js' }
]

function matchManyFileType (file) {
  const fileInfo = fileTypeList.find(e => e.reg.test(file.name)) || { dir: 'assets' }
  return `${fileInfo.dir}/[name].[hash][extname]`
}

const plugins = [
  vue2(),
  vueJsx(),
  eslint(),
  legacy({
    targets: packages.browserslist
  }),
  DefineOptions(),
  /**
   * 可按需导入vant组件（但是导入组件名不能自定义）
   * https://github.com/0ahz/vite-plugin-babel-import
   */
  vitePluginImport([
    {
      libraryName: 'vant',
      libraryDirectory: 'es',
      style (name) {
        return `vant/es/${name}/style/index.js`
      }
    }
  ])
]

if (process.env.REPORT_ANALYZER) {
  plugins.push(
    visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true
    })
  );
}

export default defineConfig({
  base: process.env.NO_CDN_PATH === 'true' || process.env.NODE_ENV === 'development'
    ? '/hsbActivity/'
    : 'https://s1.huishoubao.com/hsb_activity_web/dist/',
  define: {
    global: 'window',
    'process.env': {}
  },
  resolve: {
    alias: {
      '@': resolve(`./src`, __dirname),
      'util': 'rollup-plugin-node-polyfills/polyfills/util',
      'events': 'rollup-plugin-node-polyfills/polyfills/events',
      'stream': 'rollup-plugin-node-polyfills/polyfills/stream',
      'buffer': 'rollup-plugin-node-polyfills/polyfills/buffer-es6',
      'process': 'rollup-plugin-node-polyfills/polyfills/process-es6'
    },
  },
  server: {
    host: true
  },
  build: {
    // 图片转base64尺寸，默认4kb
    assetsInlineLimit: 0,
    // 启用/禁用 gzip 压缩大小报告
    // reportCompressedSize: true,
    rollupOptions: {
      output: {
        entryFileNames: 'js/[name].[hash].js',
        assetFileNames: (file) => {
          return matchManyFileType(file)
        },
        chunkFileNames: 'js/[name].[hash].js',
        manualChunks: (id) => {
          /**
           * 公共node_modules（小体积）模块打包进vendor
           * 体积较大的node_modules公共模块不打包进vendor好处
           * 1、会打包成公共的chunk，在用到的页面再加载，减少首次加载vendor体积过大问题
           */
          if (
            id.includes('/node_modules/') ||
            id.includes('/src/components/common') ||
            id.includes('/src/assets/') ||
            id.includes('/src/main.js')
          ) {
            return 'vendor';
          }
        }
      }
    }
  },
  plugins
});
