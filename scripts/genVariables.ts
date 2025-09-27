import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { resolve, dirname, extname } from 'path';
import { fileURLToPath } from 'url';

// 解析分层样式（foundation/semantic/component）中的 CSS 变量生成 Markdown 表格。
// 仅处理形如 --xxx: value; 的行，忽略注释与空行。

function main() {
    const __DIR = dirname(fileURLToPath(import.meta.url));
    const stylesDir = resolve(__DIR, '../src/styles');
    const targetFiles = ['foundation.scss', 'semantic.scss', 'component.scss']; // 已迁移为 SCSS 源；仍不展示 variable/dark 聚合
    const resultSections: string[] = [];
    let total = 0;

    function parseFile(file: string) {
        const filePath = resolve(stylesDir, file);
        const raw = readFileSync(filePath, 'utf-8');
        const local: { name: string; value: string }[] = [];
        for (const line of raw.split(/\r?\n/)) {
            const m = line.match(/^(\s*--[a-zA-Z0-9-_]+):\s*(.+);/);
            if (m) local.push({ name: m[1].trim(), value: m[2].trim() });
        }
        total += local.length;
        if (local.length === 0) return;
        const tableRows = local
            .map((v) => `| \`${v.name}\` | \`${v.value}\` |`)
            .join('\n');
        resultSections.push(
            `### ${file}\n\n| 变量名 | 值 |\n| ------ | --- |\n${tableRows}`
        );
    }

    for (const f of targetFiles) parseFile(f);

    const outPath = resolve(__DIR, '../docs/markdown/01-基础/00-Variables.md');
    const content = `# 变量参考\n\n总计 ${total} 个变量（不含 dark.scss 覆盖层）。\n\n> 分层文件：foundation.scss（基础原子）、semantic.scss（语义映射）、component.scss（组件级）。dark.scss 为主题覆盖层，core.scss 为明亮聚合入口，all.scss 包含 core + dark。\n\n${resultSections.join('\n\n')}\n\n> 本文件由脚本 scripts/genVariables.ts 生成，如需新增变量请修改对应样式文件后重新运行脚本。`;
    writeFileSync(outPath, content, 'utf-8');
    console.log(`Generated ${outPath}`);
}

try {
    main();
} catch (err) {
    console.error('[genVariables] failed:', err);
    process.exit(1);
}
