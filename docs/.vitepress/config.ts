import { defineConfig } from 'vitepress';
import { createDemoPreviewPlugin } from '../plugins/demo/plugin';

export default defineConfig({
    lang: 'zh-CN',
    title: 'Buig UI',
    description: 'Vue 3 组件库 - 同步 PC 与移动端的 UI 解决方案',
    srcDir: 'markdown',
    cleanUrls: true,
    markdown: {
        config(md) {
            // 使用独立插件目录下的 code-preview 插件
            md.use(
                createDemoPreviewPlugin({ keyword: 'preview', language: 'vue' })
            );
        }
    },
    themeConfig: {
        outlineTitle: '本页目录',
        lastUpdatedText: '最近更新',
        docFooter: { prev: '上一页', next: '下一页' },
        sidebar: [
            {
                text: '基础',
                items: [{ text: 'Button 按钮', link: '/button' }]
            }
        ],
        socialLinks: [
            { icon: 'github', link: 'https://github.com/chensuiyi/buig' }
        ]
    }
});
