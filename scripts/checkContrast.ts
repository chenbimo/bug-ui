import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

/*
  简易对比度检测：
    - 读取 semantic.scss 暗/亮配色下的文本与背景变量
    - 亮模式：semantic.scss 变量
    - 暗模式：dark.scss 覆盖 + semantic 作为基底
    - 计算 `--buig-color-text` / `--buig-color-text-secondary` 相对于 `--buig-color-bg` / `--buig-color-bg-subtle` / `--buig-color-bg-muted`
  - 输出对比度 < 4.5 的警告
*/

interface Palette {
    [k: string]: string;
}

function parseVars(raw: string): Palette {
    const p: Palette = {};
    for (const line of raw.split(/\r?\n/)) {
        const m = line.match(/^(\s*--[a-z0-9-]+):\s*(.+);/i);
        if (m) p[m[1].trim()] = m[2].trim();
    }
    return p;
}

function hexToRgb(hex: string): [number, number, number] | null {
    const h = hex.replace('#', '').trim();
    if (![3, 6].includes(h.length)) return null;
    const full =
        h.length === 3
            ? h
                  .split('')
                  .map((c) => c + c)
                  .join('')
            : h;
    const intVal = parseInt(full, 16);
    return [(intVal >> 16) & 255, (intVal >> 8) & 255, intVal & 255];
}

function relLuminance([r, g, b]: [number, number, number]): number {
    const srgb = [r, g, b].map((v) => {
        const c = v / 255;
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * srgb[0] + 0.7152 * srgb[1] + 0.0722 * srgb[2];
}

function contrast(a: string, b: string): number | null {
    const Ra = hexToRgb(a);
    const Rb = hexToRgb(b);
    if (!Ra || !Rb) return null;
    const La = relLuminance(Ra);
    const Lb = relLuminance(Rb);
    const lighter = Math.max(La, Lb);
    const darker = Math.min(La, Lb);
    return (lighter + 0.05) / (darker + 0.05);
}

function pickColor(value: string, fallback?: string): string | null {
    // 简单忽略非 hex 值（rgba/变量嵌套）
    if (/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(value)) return value;
    if (fallback) return pickColor(fallback);
    return null;
}

function buildContext(): { light: Palette; dark: Palette } {
    const __DIR = dirname(fileURLToPath(import.meta.url));
    const styles = resolve(__DIR, '../src/styles');
    const semantic = parseVars(
        readFileSync(resolve(styles, 'semantic.scss'), 'utf-8')
    );
    const darkRaw = readFileSync(resolve(styles, 'dark.scss'), 'utf-8');
    const darkOverrides: Palette = {};
    // 提取 dark 作用域内变量
    for (const line of darkRaw.split(/\r?\n/)) {
        const m = line.match(/--[a-z0-9-]+:\s*[^;]+;/i);
        if (m) {
            const kv = m[0].split(':');
            darkOverrides[kv[0].trim()] = kv[1].replace(/;/, '').trim();
        }
    }
    return { light: semantic, dark: { ...semantic, ...darkOverrides } };
}

function main() {
    const { light, dark } = buildContext();
    const textVars = ['--buig-color-text', '--buig-color-text-secondary'];
    const bgVars = [
        '--buig-color-bg',
        '--buig-color-bg-subtle',
        '--buig-color-bg-muted'
    ];
    const modes: [string, Palette][] = [
        ['light', light],
        ['dark', dark]
    ];
    const threshold = 4.5;
    let warnCount = 0;

    for (const [mode, palette] of modes) {
        for (const t of textVars) {
            for (const b of bgVars) {
                const tv = palette[t];
                const bv = palette[b];
                const tColor = tv && pickColor(tv);
                const bColor = bv && pickColor(bv);
                if (!tColor || !bColor) continue;
                const c = contrast(tColor, bColor);
                if (c !== null && c < threshold) {
                    warnCount++;
                    console.warn(
                        `[contrast] ${mode} ${t} on ${b} = ${c.toFixed(2)} (<${threshold})`
                    );
                }
            }
        }
    }
    if (warnCount === 0) {
        console.log('[contrast] All checked pairs pass >= 4.5');
    } else {
        console.log(`[contrast] Completed with ${warnCount} warnings.`);
    }
}

try {
    main();
} catch (err) {
    console.error('[checkContrast] failed:', err);
    process.exit(1);
}
