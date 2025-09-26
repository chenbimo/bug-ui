import { defineConfig } from 'vitepress';

// 运行 docs:dev 时由 scripts/docsDev.mjs 注入 YUI_NAV / YUI_SIDEBAR 环境变量（JSON 字符串）
function parseJSONEnv(key, fallback) {
    try {
        const v = process.env[key];
        if (!v) return fallback;
        return JSON.parse(v);
    } catch (e) {
        return fallback;
    }
}

const dynamicNav = parseJSONEnv('YUI_NAV', []);
const dynamicSidebar = parseJSONEnv('YUI_SIDEBAR', []);

export default defineConfig({
    lang: 'zh-CN',
    title: 'Buig UI',
    description: 'Vue3 组件库（MVP 重构中）',
    srcDir: 'markdown',
    themeConfig: {
        nav: dynamicNav.length ? dynamicNav : [{ text: '首页', link: '/' }],
        sidebar: dynamicSidebar.length ? dynamicSidebar : []
    }
});
