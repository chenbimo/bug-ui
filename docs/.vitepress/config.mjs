import { defineConfig } from 'vitepress';

export default defineConfig({
    lang: 'zh-CN',
    title: 'Yii UI',
    description: '为 Vue3 提供的组件库',
    themeConfig: {
        nav: [{ text: '指南', link: '/' }],
        sidebar: [
            {
                text: '基础',
                items: [{ text: 'Button 按钮', link: '/01-基础/01-Button' }]
            }
        ]
    }
});
