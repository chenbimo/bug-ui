import { promises as fs } from 'fs';
import path from 'path';

/** Sync component README into docs markdown directory. */
const ROOT = path.resolve(__dirname, '..');
const COMPONENTS_DIR = path.join(ROOT, 'src', 'components');
const DOCS_BASE_DIR = path.join(ROOT, 'docs', 'markdown');

// 简单分类与序号映射（后续可外置配置）
interface MetaCfg {
    category: string;
    order: number;
}
const META_MAP: Record<string, MetaCfg> = {
    button: { category: '01-基础', order: 10 }
};

function toPascal(name: string) {
    return name
        .split(/[-_]/)
        .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
        .join('');
}

async function ensureDir(p: string) {
    await fs.mkdir(p, { recursive: true });
}

async function exists(p: string) {
    try {
        await fs.access(p);
        return true;
    } catch {
        return false;
    }
}

async function main() {
    const dirs = await fs.readdir(COMPONENTS_DIR);
    for (const dir of dirs) {
        const full = path.join(COMPONENTS_DIR, dir);
        const stat = await fs.stat(full).catch(() => null);
        if (!stat || !stat.isDirectory()) continue;

        const readme = path.join(full, 'README.md');
        if (!(await exists(readme))) continue;

        const raw = await fs.readFile(readme, 'utf-8');

        const meta = META_MAP[dir] || { category: '99-其他', order: 999 };
        const pascal = toPascal(dir);

        const frontmatter = [
            '---',
            `title: ${pascal}`,
            `component: ${pascal}`,
            `order: ${meta.order}`,
            '---',
            ''
        ].join('\n');

        const targetDir = path.join(DOCS_BASE_DIR, meta.category);
        await ensureDir(targetDir);

        // 文件名：序号-组件名.md （序号自动补齐 2~3 位，取现有习惯，此处 2 位 + order）
        const filename = `${String(meta.order).padStart(2, '0')}-${pascal}.md`;
        const target = path.join(targetDir, filename);

        // 如果 README 自己已经有 frontmatter，则简单跳过本次注入（防止重复）
        const final = /^---[\s\S]*?---/m.test(raw) ? raw : frontmatter + raw;

        await fs.writeFile(target, final, 'utf-8');
        console.log('[docs] generated:', path.relative(ROOT, target));
    }
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
});
