import { defineConfig } from 'rolldown-vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
    plugins: [vue()],
    build: {
        cssCodeSplit: true,
        lib: {
            // 多入口：主库 + 分层样式（SCSS 源） + dark 主题
            entry: {
                index: 'src/index.ts',
                'styles/core': 'src/styles/core.scss',
                'styles/all': 'src/styles/all.scss',
                'styles/dark': 'src/styles/dark.scss'
            },
            formats: ['es'],
            fileName: (format, entryName) => `${entryName}.js`
        },
        rollupOptions: {
            external: ['vue'],
            output: {
                preserveModules: true,
                preserveModulesRoot: 'src',
                exports: 'named',
                assetFileNames: '[name][extname]'
            }
        }
    }
});
