import { defineConfig } from 'vitepress';
import fs from 'node:fs';
import path from 'node:path';

// markdown-it 插件：:::demo button/basic  或 :::demo-all button
function demoPlugin(md) {
    function renderDemo(id, info) {
        const params = info.trim().split(/\s+/).slice(1); // 允许写标题等后续扩展
        return `<Demo id="${id}" />`;
    }
    function renderDemoAll(comp) {
        return `<DemoAll component="${comp}" />`;
    }
    md.block.ruler.before(
        'fence',
        'demo_block',
        (state, startLine, endLine, silent) => {
            const start = state
                .getLines(startLine, startLine + 1, 0, false)
                .trim();
            if (!start.startsWith(':::demo')) return false;
            if (silent) return true;
            const token = state.push('demo_open', 'div', 1);
            const m = start.match(/^:::demo\s+([^\s]+)(.*)$/);
            if (m) token.meta = { id: m[1], info: m[2] || '' };
            // 查找结束 :::
            let next = startLine + 1;
            for (; next < endLine; next++) {
                const line = state.getLines(next, next + 1, 0, false).trim();
                if (line === ':::') break;
            }
            state.line = next + 1;
            const close = state.push('demo_close', 'div', -1);
            return true;
        }
    );
    md.renderer.rules.demo_open = (tokens, idx) => {
        const { id, info } = tokens[idx].meta || {};
        return renderDemo(id, info || '');
    };
    md.renderer.rules.demo_close = () => '';

    md.block.ruler.before(
        'fence',
        'demo_all_block',
        (state, startLine, endLine, silent) => {
            const start = state
                .getLines(startLine, startLine + 1, 0, false)
                .trim();
            if (!start.startsWith(':::demo-all')) return false;
            if (silent) return true;
            const token = state.push('demo_all_open', 'div', 1);
            const m = start.match(/^:::demo-all\s+([^\s]+)\s*$/);
            if (m) token.meta = { component: m[1] };
            let next = startLine + 1;
            for (; next < endLine; next++) {
                const line = state.getLines(next, next + 1, 0, false).trim();
                if (line === ':::') break;
            }
            state.line = next + 1;
            state.push('demo_all_close', 'div', -1);
            return true;
        }
    );
    md.renderer.rules.demo_all_open = (tokens, idx) => {
        const { component } = tokens[idx].meta || {};
        return renderDemoAll(component);
    };
    md.renderer.rules.demo_all_close = () => '';

    // :::api Button
    md.block.ruler.before(
        'fence',
        'api_block',
        (state, startLine, endLine, silent) => {
            const start = state
                .getLines(startLine, startLine + 1, 0, false)
                .trim();
            if (!start.startsWith(':::api')) return false;
            if (silent) return true;
            const token = state.push('api_open', 'div', 1);
            const m = start.match(/^:::api\s+([A-Za-z0-9_-]+)/);
            if (m) token.meta = { component: m[1] };
            let next = startLine + 1;
            for (; next < endLine; next++) {
                const line = state.getLines(next, next + 1, 0, false).trim();
                if (line === ':::') break;
            }
            state.line = next + 1;
            state.push('api_close', 'div', -1);
            return true;
        }
    );
    md.renderer.rules.api_open = (tokens, idx) => {
        const { component } = tokens[idx].meta || {}; // 组件名转目录：小写
        const compDir = (component || '').replace(/([A-Z])/g, (m, p1, off) =>
            off === 0 ? p1.toLowerCase() : p1.toLowerCase()
        );
        // 直接内联一个自定义占位容器，运行时不需要 hydrate，只是让构建时把文件内容注入。
        // 这里无法直接同步读取，因为 markdown-it 执行时在 docs 目录。我们相对路径回溯到 src/components。
        try {
            const fs = require('node:fs');
            const path = require('node:path');
            const apiPath = path.resolve(
                process.cwd(),
                '..',
                'src',
                'components',
                compDir,
                'demo',
                'api.md'
            );
            if (fs.existsSync(apiPath)) {
                const content = fs.readFileSync(apiPath, 'utf-8');
                return `\n<div class=\"component-api\">\n${content}\n</div>\n`;
            }
            return `<div class=\"component-api-missing\">未找到 API: ${component}</div>`;
        } catch (e) {
            return `<div class=\"component-api-error\">API 载入异常: ${(e && e.message) || e}</div>`;
        }
    };
    md.renderer.rules.api_close = () => '';
}

// 侧边栏分组：基于 docs/markdown 下的目录与文件命名规范（数字排序 + 中文分类）
// 每个 link 去掉 .md，保持与 VitePress 默认路由规则一致；前导斜杠基于 srcDir 根（markdown）。
// 若后续新增组件，请同步更新此静态配置，或改为自动生成逻辑（见仓库 scripts/ 目录的潜在脚本扩展点）。

export default defineConfig({
    lang: 'zh-CN',
    title: 'Buig UI',
    description: 'Vue3 组件库（MVP 重构中）',
    srcDir: 'markdown',
    markdown: {
        config: (md) => {
            md.use(demoPlugin);
        }
    },
    themeConfig: {
        nav: [
            // 初始组件入口：指向首个基础组件文档，可根据需要后续改成总览/索引页
            { text: '组件', link: '/01-基础/01-Button' }
        ],
        sidebar: [
            {
                text: '基础',
                items: [
                    { text: '变量 (Variables)', link: '/01-基础/00-Variables' },
                    { text: 'Button 按钮', link: '/01-基础/01-Button' },
                    { text: 'Icon 图标', link: '/01-基础/02-Icon' },
                    { text: 'Divider 分割线', link: '/01-基础/03-Divider' }
                ]
            },
            {
                text: '表单控件',
                items: [
                    { text: 'Input 输入框', link: '/02-表单控件/01-Input' },
                    {
                        text: 'Textarea 文本域',
                        link: '/02-表单控件/02-Textarea'
                    },
                    {
                        text: 'Checkbox 复选框',
                        link: '/02-表单控件/03-Checkbox'
                    },
                    { text: 'Radio 单选框', link: '/02-表单控件/04-Radio' },
                    { text: 'Switch 开关', link: '/02-表单控件/05-Switch' },
                    { text: 'Select 选择器', link: '/02-表单控件/06-Select' },
                    { text: 'Slider 滑块', link: '/02-表单控件/07-Slider' }
                ]
            },
            {
                text: '数据展示',
                items: [
                    { text: 'Avatar 头像', link: '/03-数据展示/01-Avatar' },
                    { text: 'Card 卡片', link: '/03-数据展示/02-Card' },
                    {
                        text: 'Skeleton 骨架屏',
                        link: '/03-数据展示/03-Skeleton'
                    },
                    {
                        text: 'Progress 进度条',
                        link: '/03-数据展示/04-Progress'
                    }
                ]
            },
            {
                text: '反馈',
                items: [
                    { text: 'Alert 警告', link: '/04-反馈/01-Alert' },
                    { text: 'Spinner 加载中', link: '/04-反馈/02-Spinner' },
                    { text: 'Tooltip 文字提示', link: '/04-反馈/03-Tooltip' },
                    { text: 'Badge 徽标', link: '/04-反馈/04-Badge' },
                    { text: 'Tag 标签', link: '/04-反馈/05-Tag' },
                    { text: 'Dialog 对话框', link: '/04-反馈/06-Dialog' },
                    { text: 'Drawer 抽屉', link: '/04-反馈/07-Drawer' },
                    { text: 'Toast 提示', link: '/04-反馈/08-Toast' },
                    { text: 'Popover 气泡卡片', link: '/04-反馈/09-Popover' }
                ]
            },
            {
                text: '导航',
                items: [
                    {
                        text: 'Breadcrumb 面包屑',
                        link: '/05-导航/01-Breadcrumb'
                    },
                    { text: 'Pagination 分页', link: '/05-导航/02-Pagination' },
                    { text: 'Steps 步骤条', link: '/05-导航/03-Steps' },
                    { text: 'Tabs 选项卡', link: '/05-导航/04-Tabs' }
                ]
            }
        ]
    }
});
