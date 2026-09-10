import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    vue(),
    dts({
      include: ['src'],
      outDir: 'dist',
      insertTypesEntry: true,
      // 把 SFC 的 props 类型内联进单文件 index.d.ts，
      // 消除 './components/xxx.vue' 这类 node16 下解析不了的引用
      rollupTypes: true,
    }),
  ],
  build: {
    target: 'ES2020',
    minify: false,
    sourcemap: true,
    emptyOutDir: true,
    cssCodeSplit: false,
    lib: {
      entry: 'src/index.ts',
      formats: ['es', 'cjs'],
      fileName: (format) => (format === 'es' ? 'index.js' : 'index.cjs'),
      cssFileName: 'index',
    },
    rollupOptions: {
      // peer 依赖与 workspace 依赖一律 external，不打进 bundle
      external: [
        'vue',
        'element-plus',
        /^element-plus\//,
        /^@hebang\/(tokens|theme)/,
      ],
      // 同时存在 default 与具名导出，明确 CJS 导出形态
      output: { exports: 'named' },
    },
  },
})
