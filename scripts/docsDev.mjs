// 运行：bun run docs:dev
// 仅使用 Bun API，计算导航与侧边栏并注入环境变量，再调用 vitepress。

const ROOT = 'docs/markdown';

function stripTitle(s) {
    return s.replace(/^\d+-/, '').replace(/-/g, ' ');
}
function numPrefix(name) {
    const m = name.match(/^(\d+)-/);
    return m ? parseInt(m[1], 10) : 9999;
}

async function scan() {
    const glob = new Bun.Glob(`${ROOT}/*/*.md`);
    const map = new Map();
    for await (const file of glob.scan({ cwd: process.cwd() })) {
        const rel = file.slice(ROOT.length + 1).replaceAll('\\', '/');
        const [group, fname] = rel.split('/');
        const base = fname.replace(/\.md$/, '');
        const list = map.get(group) ?? [];
        list.push({
            group,
            base,
            title: stripTitle(base),
            sort: numPrefix(fname),
            link: `/${group}/${base}`
        });
        map.set(group, list);
    }
    // sort groups and items
    const groups = [...map.entries()].sort((a, b) => numPrefix(a[0]) - numPrefix(b[0]) || a[0].localeCompare(b[0], 'zh'));
    for (const g of groups) g[1].sort((a, b) => a.sort - b.sort || a.base.localeCompare(b.base, 'zh'));
    return groups;
}

async function buildNavSidebar() {
    const groups = await scan();
    const nav = groups.map(([group, items]) => {
        const first01 = items.find((i) => i.sort === 1) || items[0];
        return { text: stripTitle(group), link: first01 ? first01.link : '/' };
    });
    const sidebar = groups.map(([group, items]) => ({
        text: stripTitle(group),
        items: items.map((i) => ({ text: i.title, link: i.link }))
    }));
    return { nav, sidebar };
}

const { nav, sidebar } = await buildNavSidebar();
// 注入环境变量
const env = { ...process.env, YUI_NAV: JSON.stringify(nav), YUI_SIDEBAR: JSON.stringify(sidebar) };

// 直接调用本地安装的 vitepress 可执行（node_modules/.bin/vitepress）
// 在 Bun 下可通过 npx/bunx 但为避免潜在退出码包裹问题，这里尝试直接解析 bin 路径
import { join } from 'node:path';
import { access } from 'node:fs/promises';

async function resolveVitePressBin() {
    const local = join(process.cwd(), 'node_modules', '.bin', 'vitepress');
    try {
        await access(local);
        return local;
    } catch {
        return 'vitepress'; // 回退到 PATH
    }
}

const bin = await resolveVitePressBin();
console.log('[docs:dev] using bin:', bin);
const proc = Bun.spawn([bin, 'dev', 'docs'], { stdio: ['inherit', 'inherit', 'inherit'], env });
const code = await proc.exited;
if (code !== 0) {
    console.error('[docs:dev] vitepress exited with code', code);
}
