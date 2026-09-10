import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  build: {
    target: 'ES2020',
    minify: false,
    sourcemap: true,
    emptyOutDir: true,
    lib: {
      // JS 入口只导出变量映射与 applyTheme，不 import CSS；
      // dist/index.css 由 scripts/generate-css.mjs 从规则引擎生成。
      entry: 'src/index.ts',
      formats: ['es', 'cjs'],
      fileName: (format) => (format === 'es' ? 'index.js' : 'index.cjs'),
    },
    rollupOptions: {
      // 依赖不打包，由宿主工程提供
      external: ['@hebang/tokens'],
    },
  },
  plugins: [
    dts({
      include: ['src'],
      insertTypesEntry: true,
      rollupTypes: true,
    }),
  ],
})
