import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
    plugins: [vue()],
    build: {
        cssCodeSplit: true,
        lib: {
            // 多入口：主库 + 分层样式（不再提供旧 variable.css 聚合） + dark.css
            entry: {
                index: 'src/index.js',
                'styles/core': 'src/styles/core.css',
                'styles/all': 'src/styles/all.css',
                'styles/dark': 'src/styles/dark.css'
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
