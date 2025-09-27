import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

// 简易解析 variable.css 中的 :root { ... } 变量，生成 markdown 列表。
// 仅处理形如 --xxx: value; 的行，忽略注释与空行。

function main() {
    const __DIR = dirname(fileURLToPath(import.meta.url));
    const cssPath = resolve(__DIR, '../src/styles/variable.css');
    const outPath = resolve(__DIR, '../docs/markdown/01-基础/00-Variables.md');
    const raw = readFileSync(cssPath, 'utf-8');
    const lines = raw.split(/\r?\n/);
    const vars: { name: string; value: string }[] = [];
    for (const line of lines) {
        const m = line.match(/^(\s*--[a-zA-Z0-9-_]+):\s*(.+);/);
        if (m) {
            vars.push({ name: m[1].trim(), value: m[2].trim() });
        }
    }

    const header = `# 变量参考 (variable.css)\n\n共 ${vars.length} 个变量。\n\n| 变量名 | 值 |\n| ------ | --- |\n`;
    const body = vars
        .map(
            (v) => `| \
\`${v.name}\` | \
\`${v.value}\` |`
        )
        .join('\n');
    const content = `${header}${body}\n\n> 本文件由脚本 scripts/genVariables.ts 生成，如需新增变量请修改 \`src/styles/variable.css\` 然后重新运行脚本。`;
    writeFileSync(outPath, content, 'utf-8');
    console.log(`Generated ${outPath}`);
}

try {
    main();
} catch (err) {
    console.error('[genVariables] failed:', err);
    process.exit(1);
}
