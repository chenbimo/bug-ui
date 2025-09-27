import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { resolve, extname } from 'path';
import { fileURLToPath } from 'url';

/*
  为每个组件文档自动追加“关联变量”段落：
    规则：根据组件英文名（Button -> button）匹配 component.scss 中以 --ui-<name>- 前缀的变量；
    若严格前缀为空则尝试宽松包含策略（例如历史命名或复合变量）。
*/

function loadVariables(): string[] {
    const __DIR = resolve(fileURLToPath(import.meta.url), '..');
    const styleDir = resolve(__DIR, '../src/styles');
    const sources = ['foundation.scss', 'semantic.scss', 'component.scss'];
    const vars: string[] = [];
    for (const file of sources) {
        const p = resolve(styleDir, file);
        let raw = '';
        try {
            raw = readFileSync(p, 'utf-8');
        } catch {
            continue;
        }
        for (const line of raw.split(/\r?\n/)) {
            const m = line.match(/--[a-z0-9-]+/i);
            if (m) vars.push(m[0]);
        }
    }
    return Array.from(new Set(vars));
}

function main() {
    const vars = loadVariables();
    const __DIR = resolve(fileURLToPath(import.meta.url), '..');
    const baseDir = resolve(__DIR, '../docs/markdown');
    const compDirs = [
        '01-基础',
        '02-表单控件',
        '03-数据展示',
        '04-反馈',
        '05-导航'
    ];
    const componentNames: string[] = [];

    for (const dir of compDirs) {
        const abs = resolve(baseDir, dir);
        try {
            const files = readdirSync(abs);
            for (const f of files) {
                if (extname(f) !== '.md') continue;
                if (/00-Variables\.md/.test(f)) continue;
                // 02-Icon.md -> Icon
                const namePart = f.replace(/^[0-9]+-/, '').replace(/\.md$/, '');
                componentNames.push(namePart);
                const matchPrefix = namePart.toLowerCase();
                // 组件级匹配策略：--ui-button- 前缀 (严格) + 兜底包含名 (宽松)
                const strictPrefix = `--ui-${matchPrefix}-`;
                let related = vars.filter((v) => v.startsWith(strictPrefix));
                if (related.length === 0) {
                    related = vars.filter((v) =>
                        v.includes(`-${matchPrefix}-`)
                    );
                }
                if (related.length === 0) continue; // 当前没有具体变量，暂跳过
                const filePath = resolve(abs, f);
                const origin = readFileSync(filePath, 'utf-8');
                if (/## 关联变量/.test(origin)) continue; // 已存在
                const section = `\n\n## 关联变量\n\n当前组件可用变量（匹配名称包含 \`${matchPrefix}\`）：\n\n${related.map((r) => `- \`${r}\``).join('\n')}\n`;
                writeFileSync(filePath, origin + section, 'utf-8');
                console.log('Appended variables section to', f);
            }
        } catch (e) {
            // ignore missing dirs
        }
    }
}

try {
    main();
} catch (err) {
    console.error('[appendVariablesSection] failed:', err);
    process.exit(1);
}
