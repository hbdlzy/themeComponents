import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  build: {
    target: 'ES2020',
    minify: false,
    sourcemap: true,
    emptyOutDir: true,
    lib: {
      entry: 'src/index.ts',
      formats: ['es', 'cjs'],
      fileName: (format) => (format === 'es' ? 'index.js' : 'index.cjs'),
    },
  },
  plugins: [
    dts({
      include: ['src'],
      insertTypesEntry: true,
      // 把类型声明收敛成单文件，消除无扩展名的相对引用（node16 ESM 解析要求）
      rollupTypes: true,
    }),
  ],
})
