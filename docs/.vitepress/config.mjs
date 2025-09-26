import { defineConfig } from 'vitepress';
import { readdirSync, existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

// 动态生成 sidebar/nav:
// 1. 读取 src/components 下的 *.vue 组件名作为候选。
// 2. 基于 docs/markdown 目录结构（01-基础/01-Button.md 等）匹配已有文档；若无匹配则生成“占位”链接到 /components/<name>（可后续创建）。
// 3. 根据分类目录数字前缀排序，同级文件按文件名前缀数字排序。

function stripPrefixNum(name) {
    return name.replace(/^[0-9]+-/, '');
}
function sortByNumericPrefix(a, b) {
    const na = parseInt(a.match(/^([0-9]+)/)?.[1] || '9999', 10);
    const nb = parseInt(b.match(/^([0-9]+)/)?.[1] || '9999', 10);
    if (na !== nb) return na - nb;
    return a.localeCompare(b, 'zh');
}

const DOCS_ROOT = join(process.cwd(), 'docs', 'markdown');
const COMPONENT_ROOT = join(process.cwd(), 'src', 'components');

function collectComponentNames() {
    try {
        return readdirSync(COMPONENT_ROOT)
            .filter((f) => f.endsWith('.vue'))
            .map((f) => f.replace(/\.vue$/, ''));
    } catch {
        return [];
    }
}

function collectDocs() {
    const groups = [];
    let groupDirs = [];
    try {
        groupDirs = readdirSync(DOCS_ROOT).filter((d) => !d.startsWith('.'));
    } catch {
        return [];
    }
    groupDirs.sort(sortByNumericPrefix);
    for (const g of groupDirs) {
        const full = join(DOCS_ROOT, g);
        let files = [];
        try {
            files = readdirSync(full).filter((f) => f.endsWith('.md'));
        } catch {
            continue;
        }
        files.sort(sortByNumericPrefix);
        const items = files.map((f) => {
            const base = f.replace(/\.md$/, '');
            return { text: stripPrefixNum(base), link: `/${g}/${base}` };
        });
        groups.push({ raw: g, text: stripPrefixNum(g), items });
    }
    return groups;
}

const componentNames = collectComponentNames();
const docGroups = collectDocs();

// 生成 nav：各分组一个入口（取第一个文件）
const nav = docGroups.map((g) => ({ text: g.text, link: g.items[0]?.link || '/' }));
const fullNav = [{ text: '首页', link: '/' }, ...nav];

// 从现有文档中提取已经覆盖的组件（根据末尾名称匹配，如 Button）
const documentedComponents = new Set();
for (const g of docGroups) {
    for (const item of g.items) {
        const compName = item.text.split(/\s+/)[0];
        documentedComponents.add(compName.toLowerCase());
    }
}
// 未记录的组件形成一个“未分类”组（可选）
const undocumented = componentNames.filter((c) => !documentedComponents.has(c.replace(/^buig/i, '').toLowerCase()));
if (undocumented.length) {
    docGroups.push({
        raw: '99-未分类',
        text: '未分类',
        items: undocumented.sort().map((c) => ({ text: c, link: `/components/${c}` }))
    });
}

export default defineConfig({
    lang: 'zh-CN',
    title: 'Buig UI',
    description: 'Vue3 组件库（MVP 重构中）',
    srcDir: 'markdown',
    themeConfig: {
        nav: fullNav,
        sidebar: docGroups.map((g) => ({ text: g.text, items: g.items }))
    }
});
