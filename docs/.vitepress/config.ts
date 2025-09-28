import { defineConfig } from 'vitepress';

export default defineConfig({
    lang: 'zh-CN',
    title: 'Buig UI',
    description: 'Vue 3 组件库 - 同步 PC 与移动端的 UI 解决方案',
    srcDir: 'markdown',
    cleanUrls: true,
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
