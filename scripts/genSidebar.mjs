// 运行：bun run gen:sidebar
// 仅使用 Bun API（Bun.Glob / Bun.write）来扫描 docs/markdown 并生成 VitePress 侧边栏

function stripNumAndHyphen(s) {
    return s.replace(/^\d+-/, '').replace(/-/g, ' ');
}

async function main() {
    const root = 'docs/markdown';
    const groupsMap = new Map();

    const glob = new Bun.Glob(`${root}/*/*.md`);
    for await (const filePath of glob.scan({ cwd: process.cwd() })) {
        const rel = filePath.slice(root.length + 1).replaceAll('\\', '/');
        const [group, name] = rel.split('/');
        if (!group || !name) continue;
        const base = name.replace(/\.md$/, '');
        const groupTitle = stripNumAndHyphen(group);
        const fileTitle = stripNumAndHyphen(base);
        const arr = groupsMap.get(group) ?? [];
        arr.push({ text: fileTitle, link: `/${group}/${base}`, _sort: name });
        groupsMap.set(group, arr);
    }

    const collator = new Intl.Collator('zh');
    const sidebar = [...groupsMap.entries()]
        .sort((a, b) => collator.compare(a[0], b[0]))
        .map(([group, items]) => ({
            text: stripNumAndHyphen(group),
            items: items.sort((a, b) => collator.compare(a._sort, b._sort)).map(({ _sort, ...rest }) => rest)
        }));

    const out = `// 该文件由 Bun 任务生成：bun run gen:sidebar\n// 不要手动修改\n\nexport default ${JSON.stringify(sidebar, null, 2)}\n`;
    await Bun.write('docs/.vitepress/sidebar.generated.mjs', out);
    console.log('sidebar.generated.mjs written.');
}

await main();
