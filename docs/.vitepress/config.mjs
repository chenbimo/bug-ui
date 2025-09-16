import { defineConfig } from 'vitepress';
import sidebar from './sidebar.generated.mjs';

export default defineConfig({
    lang: 'zh-CN',
    title: 'Yii UI',
    description: '为 Vue3 提供的组件库',
    srcDir: 'markdown',
    themeConfig: {
        sidebar
    }
});
