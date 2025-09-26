#!/usr/bin/env bun
/**
 * Lightweight component meta extractor.
 * Parses .vue single-file components in src/components.
 * Extracts: component name (defineOptions), props (defineProps object literal), emits (defineEmits list), slots (slot tags).
 * NOTE: This is regex-based and not a full AST; complex dynamic definitions may be skipped.
 */
import { readdirSync, readFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = process.cwd();
const COMPONENT_DIR = join(ROOT, 'src', 'components');
const OUTPUT_DIR = join(ROOT, 'docs', '.meta');

function ensureDir(p) {
    try {
        mkdirSync(p, { recursive: true });
    } catch (e) {
        /* ignore */
    }
}

const vueFiles = readdirSync(COMPONENT_DIR).filter((f) => f.endsWith('.vue'));

const meta = {};

const RE_NAME = /defineOptions\(\{\s*name:\s*'([^']+)'/;
const RE_PROPS_BLOCK = /defineProps\((\{[\s\S]*?\})\)/;
const RE_EMITS_LIST = /defineEmits\(\[([^\]]*)\]\)/;
const RE_SLOT_TAG = /<slot(\s+name="([^"]+)")?/g;

function parseProps(raw) {
    const props = [];
    if (!raw) return props;
    // crude split by lines containing `:` at first level
    const body = raw.trim().replace(/^\{/, '').replace(/\}$/, '');
    let depth = 0;
    let current = '';
    const push = () => {
        if (current.trim()) props.push(current.trim());
        current = '';
    };
    for (const ch of body) {
        if (ch === '{') depth++;
        if (ch === '}') depth--;
        if (ch === ',' && depth === 0) {
            push();
            continue;
        }
        current += ch;
    }
    push();
    return props
        .map((segment) => {
            const m = segment.match(/^(\w+)\s*:/);
            if (!m) return null;
            const name = m[1];
            const typeMatch = segment.match(/type:\s*([^,}]+)/);
            const defMatch = segment.match(/default:\s*([^,}]+)/);
            return { name, type: typeMatch ? typeMatch[1].trim() : 'unknown', default: defMatch ? defMatch[1].trim() : undefined };
        })
        .filter(Boolean);
}

function parseEmits(raw) {
    if (!raw) return [];
    return raw
        .split(',')
        .map((s) => s.trim().replace(/['"`]/g, ''))
        .filter(Boolean);
}

for (const file of vueFiles) {
    const full = join(COMPONENT_DIR, file);
    const content = readFileSync(full, 'utf-8');
    const name = content.match(RE_NAME)?.[1] || file.replace(/\.vue$/, '');
    const propsRaw = content.match(RE_PROPS_BLOCK)?.[1];
    const emitsRaw = content.match(RE_EMITS_LIST)?.[1];
    const slots = new Set();
    let sm;
    while ((sm = RE_SLOT_TAG.exec(content))) {
        slots.add(sm[2] || 'default');
    }
    meta[name] = {
        file: `src/components/${file}`,
        props: parseProps(propsRaw),
        emits: parseEmits(emitsRaw),
        slots: Array.from(slots)
    };
}

ensureDir(OUTPUT_DIR);
const jsonPath = join(OUTPUT_DIR, 'components.json');
writeFileSync(jsonPath, JSON.stringify(meta, null, 2), 'utf-8');

// Generate markdown
let md = '# 组件 API 元数据\n\n';
for (const [name, info] of Object.entries(meta)) {
    md += `## ${name}\n\n`;
    md += `源文件: \`${info.file}\`\n\n`;
    if (info.props.length) {
        md += '### Props\n\n| 名称 | 类型 | 默认值 |\n|------|------|--------|\n';
        for (const p of info.props) {
            md += `| ${p.name} | ${p.type} | ${p.default ?? ''} |\n`;
        }
        md += '\n';
    }
    if (info.emits.length) {
        md += '### Emits\n\n';
        md += info.emits.map((e) => '- `' + e + '`').join('\n') + '\n\n';
    }
    if (info.slots.length) {
        md += '### Slots\n\n';
        md += info.slots.map((s) => '- `' + s + '`').join('\n') + '\n\n';
    }
}
writeFileSync(join(OUTPUT_DIR, 'components.md'), md, 'utf-8');

console.log(`[genComponentMeta] Generated meta for ${vueFiles.length} components -> ${jsonPath}`);
