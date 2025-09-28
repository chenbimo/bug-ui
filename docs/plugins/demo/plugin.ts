import type MarkdownIt from 'markdown-it';
import type Token from 'markdown-it/lib/token';

interface Options {
    keyword?: string;
    language?: string;
}

function escapeHtml(html: string) {
    return html
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function parseInfo(info: string) {
    const [lang, ...rest] = info.trim().split(/\s+/);
    return { lang: lang || '', meta: rest.join(' ') };
}

export function createDemoPreviewPlugin(options: Options = {}) {
    const { keyword = 'preview', language = 'vue' } = options;
    return (md: MarkdownIt) => {
        const defaultFence = md.renderer.rules.fence!;
        md.renderer.rules.fence = (tokens: Token[], idx: number, ...args) => {
            const token = tokens[idx];
            const info = parseInfo(token.info);
            if (
                info.lang === language &&
                (!keyword || token.info.includes(keyword))
            ) {
                const raw = token.content;
                const escaped = escapeHtml(raw);
                const origin = defaultFence(tokens, idx, ...args);
                return `<Demo code="${escaped}" raw="${escaped}" lang="${info.lang}" meta="${escapeHtml(info.meta)}">${origin}</Demo>`;
            }
            return defaultFence(tokens, idx, ...args);
        };
    };
}
