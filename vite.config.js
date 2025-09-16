import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
    plugins: [vue()],
    build: {
        cssCodeSplit: true,
        lib: {
            // 多入口：主库与样式 tokens
            entry: {
                index: 'src/index.js',
                'styles/tokens': 'src/styles/tokens.css'
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
