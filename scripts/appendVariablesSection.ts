import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { resolve, extname } from 'path';
import { fileURLToPath } from 'url';

/*
  为每个组件文档自动追加“关联变量”段落：
  规则：根据组件英文名（Button -> button）匹配 variable.css 中包含该 block 名的变量行（--ui-...-button-...）。
  当前 variable.css 尚未细分具体组件变量，脚本将跳过无匹配的组件（不写入）。
*/

function loadVariables(): string[] {
    const __DIR = resolve(fileURLToPath(import.meta.url), '..');
    const cssPath = resolve(__DIR, '../src/styles/variable.css');
    const raw = readFileSync(cssPath, 'utf-8');
    const vars: string[] = [];
    for (const line of raw.split(/\r?\n/)) {
        const m = line.match(/--[a-z0-9-]+/i);
        if (m) vars.push(m[0]);
    }
    return vars;
}

function main() {
    const vars = loadVariables();
    const __DIR = resolve(fileURLToPath(import.meta.url), '..');
    const baseDir = resolve(__DIR, '../docs/markdown');
    const compDirs = ['01-基础', '02-表单控件', '03-数据展示', '04-反馈', '05-导航'];
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
                const related = vars.filter((v) => v.includes(matchPrefix));
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
