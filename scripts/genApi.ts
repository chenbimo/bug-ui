/**
 * genApi.ts - 生成组件 API Markdown (Props / Events / Slots / Expose)
 * 约定：
 *  - 组件目录：src/components/<component>
 *  - 类型来源：interface.ts (优先)；若不存在则回退解析同名 .vue 中的 defineProps 泛型/对象(首版仅支持 interface.ts)
 *  - 输出：src/components/<component>/demo/api.md
 *  - 列头：中文；默认值 / 说明未知时使用 '-'; 必填列：是 / 否
 *  - 幂等：内容无变化不写入
 */
import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';

interface PropRow {
    name: string;
    type: string;
    required: boolean;
    defaultValue: string;
    desc: string;
}
interface EventRow {
    name: string;
    params: string;
    desc: string;
}
interface SlotRow {
    name: string;
    desc: string;
}
interface ExposeRow {
    name: string;
    desc: string;
}

interface ComponentApiData {
    component: string;
    props: PropRow[];
    events: EventRow[];
    slots: SlotRow[];
    expose: ExposeRow[];
}

const ROOT = path.resolve(process.cwd(), 'src', 'components');

function log(msg: string) {
    console.log(`[gen:api] ${msg}`);
}

function readDirComponents(): string[] {
    if (!fs.existsSync(ROOT)) return [];
    return fs.readdirSync(ROOT).filter((d) => {
        const full = path.join(ROOT, d);
        return fs.statSync(full).isDirectory();
    });
}

function parseInterfaceFile(component: string): ComponentApiData | null {
    const interfaceFile = path.join(ROOT, component, 'interface.ts');
    const sfcFile = path.join(ROOT, component, `${component}.vue`);
    if (!fs.existsSync(interfaceFile)) {
        if (!fs.existsSync(sfcFile)) {
            log(`跳过 ${component} (无 interface.ts / .vue)`);
            return null;
        }
        log(`当前首版仅支持 interface.ts，组件 ${component} 暂跳过`);
        return null;
    }
    const code = fs.readFileSync(interfaceFile, 'utf-8');
    const sf = ts.createSourceFile(
        interfaceFile,
        code,
        ts.ScriptTarget.Latest,
        true,
        ts.ScriptKind.TS
    );

    const data: ComponentApiData = {
        component,
        props: [],
        events: [],
        slots: [],
        expose: []
    };

    sf.forEachChild((node) => {
        if (ts.isInterfaceDeclaration(node)) {
            const name = node.name.text;
            if (/Props$/.test(name)) {
                node.members.forEach((m) => {
                    if (
                        ts.isPropertySignature(m) &&
                        m.name &&
                        ts.isIdentifier(m.name)
                    ) {
                        const propName = m.name.text;
                        const typeNode = m.type;
                        const typeText = typeNode
                            ? typeNode.getText(sf)
                            : 'any';
                        const required = !m.questionToken; // 无 ? 视为必填
                        const jsDoc = ts.getJSDocCommentsAndTags(m) as any[];
                        const desc =
                            jsDoc && jsDoc.length
                                ? jsDoc
                                      .map((j) => j.comment || '')
                                      .filter(Boolean)
                                      .join(' ')
                                : '-';
                        data.props.push({
                            name: propName,
                            type: typeText,
                            required,
                            defaultValue: '-',
                            desc: desc || '-'
                        });
                    }
                });
            } else if (/Emits$/.test(name)) {
                node.members.forEach((m) => {
                    if (ts.isCallSignatureDeclaration(m)) {
                        const firstParam = m.parameters[0];
                        if (
                            firstParam &&
                            firstParam.type &&
                            ts.isLiteralTypeNode(firstParam.type) &&
                            ts.isStringLiteral(firstParam.type.literal)
                        ) {
                            const eventName = firstParam.type.literal.text;
                            const params: string[] = [];
                            m.parameters.slice(1).forEach((p) => {
                                const pName = p.name.getText(sf);
                                const pType = p.type
                                    ? p.type.getText(sf)
                                    : 'any';
                                params.push(`${pName}: ${pType}`);
                            });
                            data.events.push({
                                name: eventName,
                                params: params.length ? params.join(', ') : '-',
                                desc: '-'
                            });
                        }
                    }
                });
            } else if (/Slots$/.test(name)) {
                node.members.forEach((m) => {
                    if (
                        ts.isPropertySignature(m) &&
                        m.name &&
                        ts.isIdentifier(m.name)
                    ) {
                        const slotName = m.name.text;
                        data.slots.push({ name: slotName, desc: '-' });
                    }
                });
            } else if (/Expose$/.test(name)) {
                node.members.forEach((m) => {
                    if (
                        ts.isPropertySignature(m) &&
                        m.name &&
                        ts.isIdentifier(m.name)
                    ) {
                        const memberName = m.name.text;
                        data.expose.push({ name: memberName, desc: '-' });
                    }
                });
            }
        }
    });

    return data;
}

function toMarkdown(data: ComponentApiData): string {
    const lines: string[] = [];
    // Props
    lines.push('## Props');
    if (data.props.length) {
        lines.push('| 名称 | 类型 | 默认值 | 必填 | 说明 |');
        lines.push('| ---- | ---- | ------ | ---- | ---- |');
        data.props.forEach((p) => {
            lines.push(
                `| ${p.name} | ${escapePipe(p.type)} | ${p.defaultValue} | ${p.required ? '是' : '否'} | ${p.desc || '-'} |`
            );
        });
    } else {
        lines.push('暂无');
    }
    lines.push('');
    // Events
    lines.push('## Events');
    if (data.events.length) {
        lines.push('| 事件 | 参数 | 说明 |');
        lines.push('| ---- | ---- | ---- |');
        data.events.forEach((e) => {
            lines.push(
                `| ${e.name} | ${escapePipe(e.params)} | ${e.desc || '-'} |`
            );
        });
    } else {
        lines.push('暂无');
    }
    lines.push('');
    // Slots
    lines.push('## Slots');
    if (data.slots.length) {
        lines.push('| 插槽 | 说明 |');
        lines.push('| ---- | ---- |');
        data.slots.forEach((s) => {
            lines.push(`| ${s.name} | ${s.desc || '-'} |`);
        });
    } else {
        lines.push('暂无');
    }
    lines.push('');
    // Expose
    lines.push('## Expose');
    if (data.expose.length) {
        lines.push('| 成员 | 说明 |');
        lines.push('| ---- | ---- |');
        data.expose.forEach((ex) => {
            lines.push(`| ${ex.name} | ${ex.desc || '-'} |`);
        });
    } else {
        lines.push('暂无');
    }
    lines.push('');
    return lines.join('\n');
}

function escapePipe(v: string): string {
    return v.replace(/\|/g, '\\|');
}

function ensureDir(p: string) {
    if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
}

function writeIfChanged(file: string, content: string) {
    if (fs.existsSync(file)) {
        const old = fs.readFileSync(file, 'utf-8');
        if (old === content) {
            log(`未变化: ${file}`);
            return;
        }
    }
    fs.writeFileSync(file, content, 'utf-8');
    log(`写入: ${file}`);
}

function run() {
    const targetArgIndex = process.argv.findIndex((a) => a === '--component');
    const only = targetArgIndex >= 0 ? process.argv[targetArgIndex + 1] : '';
    const components = only ? [only] : readDirComponents();
    if (!components.length) {
        log('未发现任何组件目录');
        return;
    }
    components.forEach((comp) => {
        try {
            const data = parseInterfaceFile(comp);
            if (!data) return;
            const md = toMarkdown(data);
            const outDir = path.join(ROOT, comp, 'demo');
            ensureDir(outDir);
            const outFile = path.join(outDir, 'api.md');
            writeIfChanged(outFile, md);
        } catch (err) {
            // 单组件错误不中断其它组件
            console.error(`[gen:api] 组件 ${comp} 解析失败`, err);
        }
    });
}

run();

export {}; // 模块化
