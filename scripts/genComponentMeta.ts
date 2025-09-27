// (shebang removed to avoid nested bun execution issues when using `bun run`)
/**
 * Enhanced Component Meta Generator (SFC + TS Generic Parsing)
 * Plan (方案1):
 *  - Use @vue/compiler-sfc to parse SFC descriptor
 *  - Use regex to extract TypeScript generic blocks of defineProps / defineEmits
 *  - Extract slots from <slot>, <template #x>, <template v-slot:x>
 *  - Do NOT attempt default value inference now
 *  - Output JSON with version + generatedAt, and Markdown with overview table
 */
import { readdirSync, readFileSync, mkdirSync, writeFileSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { parse } from '@vue/compiler-sfc';

interface PropMeta {
    name: string;
    type: string;
    optional: boolean;
}
interface ComponentMetaEntry {
    file: string;
    props: PropMeta[];
    emits: string[];
    slots: string[];
}
interface ComponentMetaJSON {
    version: string;
    generatedAt: string;
    components: Record<string, ComponentMetaEntry>;
}

const ROOT = process.cwd();
const COMPONENT_DIR = join(ROOT, 'src', 'components');
const OUTPUT_DIR = join(ROOT, 'docs', '.meta');

function ensureDir(p: string) {
    try {
        mkdirSync(p, { recursive: true });
    } catch {
        /* ignore */
    }
}

// Read package meta for version info
let pkgNameVersion = 'unknown@0.0.0';
try {
    const pkg = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf-8'));
    pkgNameVersion = `${pkg.name}@${pkg.version}`;
} catch (e) {
    console.error('[genComponentMeta] Cannot read package.json:', e);
}

// 深度遍历收集所有 .vue 文件，支持目录化组件
function collectVueFiles(dir: string, acc: string[] = []): string[] {
    for (const entry of readdirSync(dir)) {
        const full = join(dir, entry);
        let st; try { st = statSync(full); } catch { continue; }
        if (st.isDirectory()) collectVueFiles(full, acc);
        else if (entry.endsWith('.vue')) acc.push(full);
    }
    return acc;
}
const files = collectVueFiles(COMPONENT_DIR);

// Regex patterns
const RE_NAME = /defineOptions\(\{\s*name:\s*'([^']+)'/;
const RE_DEFINE_PROPS_INLINE = /defineProps<\s*\{([\s\S]*?)\}\s*>\(\)/;
const RE_DEFINE_PROPS_IDENTIFIER = /defineProps<\s*([A-Z][A-Za-z0-9_]*)\s*>\(\)/;
const RE_INTERFACE_BLOCK = /interface\s+([A-Z][A-Za-z0-9_]*)\s*\{([\s\S]*?)\}/g;
const RE_TYPE_ALIAS_BLOCK = /type\s+([A-Z][A-Za-z0-9_]*)\s*=\s*\{([\s\S]*?)\}/g;
const RE_DEFINE_EMITS_GENERIC = /defineEmits<\s*\{([\s\S]*?)\}\s*>\(\)/;
// emits call forms: (e: 'click' | 'open', ...). We capture first literal occurrence.
const RE_EMIT_EVENT = /\(e:\s*['"]([^'"`]+)['"]/g;

// Slots
const RE_SLOT_SIMPLE = /<slot(\s+name="([^"]+)")?/g;
const RE_SLOT_TEMPLATE_SHARP = /<template\s+#([a-zA-Z0-9_-]+)/g;
const RE_SLOT_TEMPLATE_VSLOT = /<template\s+v-slot:([a-zA-Z0-9_-]+)/g;

function parsePropsGeneric(block: string | undefined): PropMeta[] {
    if (!block) return [];
    // Split by lines, ignore empty/comment lines
    const lines = block
        .split(/\n/)
        .map((l) => l.trim())
        .filter((l) => l && !l.startsWith('//'));
    const props: PropMeta[] = [];
    for (const line of lines) {
        // Stop if block ended prematurely (safety)
        if (line === '}') break;
        // Match pattern: name?: type; OR name: type;
        // Allow trailing comma/semicolon
        const m = line.match(/^(\w+)(\?)?\s*:\s*([^;]+)[;,]?$/);
        if (m) {
            props.push({ name: m[1], optional: !!m[2], type: m[3].trim() });
        }
    }
    return props;
}

function parseEmitsGeneric(block: string | undefined): string[] {
    if (!block) return [];
    const events = new Set<string>();
    let m: RegExpExecArray | null;
    while ((m = RE_EMIT_EVENT.exec(block))) {
        events.add(m[1]);
    }
    return Array.from(events);
}

const meta: Record<string, ComponentMetaEntry> = {};

for (const full of files) {
    const rel = full.substring(ROOT.length + 1).replace(/\\/g, '/');
    const file = rel.substring(rel.lastIndexOf('/') + 1);
    const raw = readFileSync(full, 'utf-8');
    const { descriptor } = parse(raw);
    const scriptContent = descriptor.scriptSetup?.content || descriptor.script?.content || '';

    const name = raw.match(RE_NAME)?.[1] || file.replace(/\.vue$/, '');
    let propsBlock = scriptContent.match(RE_DEFINE_PROPS_INLINE)?.[1];
    let identifier: string | undefined;
    if (!propsBlock) identifier = scriptContent.match(RE_DEFINE_PROPS_IDENTIFIER)?.[1];
    const blocks: Record<string, string> = {};
    const collectBlocks = (code: string) => {
        let m: RegExpExecArray | null;
        while ((m = RE_INTERFACE_BLOCK.exec(code))) blocks[m[1]] = m[2];
        while ((m = RE_TYPE_ALIAS_BLOCK.exec(code))) blocks[m[1]] = m[2];
    };
    collectBlocks(scriptContent);
    if (identifier && !blocks[identifier]) {
        try {
            const typesFile = join(dirname(full), 'types.ts');
            const typesRaw = readFileSync(typesFile, 'utf-8');
            collectBlocks(typesRaw);
        } catch {/* ignore */}
    }
    if (!propsBlock && identifier && blocks[identifier]) propsBlock = blocks[identifier];
    const emitsBlock = scriptContent.match(RE_DEFINE_EMITS_GENERIC)?.[1];

    const props = parsePropsGeneric(propsBlock);
    const emits = parseEmitsGeneric(emitsBlock);

    const slotsSet = new Set<string>();
    let sm: RegExpExecArray | null;
    while ((sm = RE_SLOT_SIMPLE.exec(raw))) {
        slotsSet.add(sm[2] || 'default');
    }
    while ((sm = RE_SLOT_TEMPLATE_SHARP.exec(raw))) {
        slotsSet.add(sm[1]);
    }
    while ((sm = RE_SLOT_TEMPLATE_VSLOT.exec(raw))) {
        slotsSet.add(sm[1]);
    }

    meta[name] = {
        file: rel,
        props,
        emits,
        slots: Array.from(slotsSet)
    };
}

// Compose JSON structure
const jsonOutput: ComponentMetaJSON = {
    version: pkgNameVersion,
    generatedAt: new Date().toISOString(),
    components: meta
};

ensureDir(OUTPUT_DIR);
writeFileSync(join(OUTPUT_DIR, 'components.json'), JSON.stringify(jsonOutput, null, 2), 'utf-8');

// Build overview table
const overviewRows: string[] = [];
for (const [cName, entry] of Object.entries(meta)) {
    overviewRows.push(`| ${cName} | ${entry.props.length} | ${entry.emits.length} | ${entry.slots.length} |`);
}
overviewRows.sort();

// Markdown generation
let md = '# 组件 API 元数据\n\n';
md += '## 总览\n\n';
md += '| 组件 | Props | Emits | Slots |\n|------|-------|-------|-------|\n';
md += overviewRows.join('\n') + '\n\n';
md += `> 版本: ${jsonOutput.version}  生成时间: ${jsonOutput.generatedAt}\n\n`;

for (const [name, info] of Object.entries(meta)) {
    md += `### ${name}\n\n`;
    md += `源文件: \`${info.file}\`\n\n`;
    if (info.props.length) {
        md += '#### Props\n\n| 名称 | 类型 | 可选 |\n|------|------|------|\n';
        for (const p of info.props) {
            const rawType = p.type;
            // Escape pipe characters inside union types for markdown tables
            const safeType = '`' + rawType.replace(/\|/g, ' \\| ') + '`';
            md += `| ${p.name} | ${safeType} | ${p.optional ? 'Y' : 'N'} |\n`;
        }
        md += '\n';
    }
    if (info.emits.length) {
        md += '#### Emits\n\n';
        for (const e of info.emits) {
            md += `- \`${e}\`\n`;
        }
        md += '\n';
    }
    if (info.slots.length) {
        md += '#### Slots\n\n';
        for (const s of info.slots) {
            md += `- \`${s}\`\n`;
        }
        md += '\n';
    }
}
writeFileSync(join(OUTPUT_DIR, 'components.md'), md, 'utf-8');

console.log(`[genComponentMeta] Generated meta for ${files.length} components.`);
