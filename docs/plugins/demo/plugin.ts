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

        // 额外：解析 <Demo ...>...</Demo> 结构，若未显式写 code / :code 则自动注入其内部原始源码
        // 简易策略：在渲染 html_inline/html_block token 时不处理；使用 core ruler 遍历 token 对
        md.core.ruler.after('inline', 'demo_auto_code', (state) => {
            const tokens = state.tokens;
            for (let i = 0; i < tokens.length; i++) {
                const t = tokens[i];
                if (t.type === 'html_block' || t.type === 'html_inline') {
                    // 捕获开标签 <Demo ...>
                    const openMatch = t.content.match(/<Demo(\s+[^>]*)?>/);
                    if (openMatch) {
                        // 查找后续是否存在对应的关闭标签
                        let j = i + 1;
                        let innerRaw = '';
                        let foundClose = false;
                        for (; j < tokens.length; j++) {
                            const tj = tokens[j];
                            if (
                                tj.type === 'html_block' ||
                                tj.type === 'html_inline'
                            ) {
                                if (tj.content.includes('</Demo>')) {
                                    // 结束
                                    const idxClose =
                                        tj.content.indexOf('</Demo>');
                                    innerRaw += tj.content.substring(
                                        0,
                                        idxClose
                                    );
                                    foundClose = true;
                                    break;
                                }
                            }
                            innerRaw += tj.content || '';
                        }
                        if (foundClose) {
                            // 如果开标签里已经含有 code / :code 跳过
                            if (/\scode=|\s:code=/.test(openMatch[0])) continue;
                            // 保留原始缩进与换行，转义用于属性
                            const escapedInner = escapeHtml(innerRaw.trim());
                            // 重写开标签 token 内容：插入 :code
                            t.content = t.content.replace(
                                openMatch[0],
                                openMatch[0].replace(
                                    />$/,
                                    ` :code="\`${escapedInner}\`">`
                                )
                            );
                        }
                    }
                }
            }
        });
    };
}
