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

        // 额外：手写 <Demo>...</Demo> 结构支持：利用行号 (token.map) 从原始 markdown 精准截取内部源码
        // 实现：
        // 1. 遍历 token，发现含 <Demo 的 html_block / html_inline 视为开标签（未包含 code / :code / code-enc）
        // 2. 向后寻找含 </Demo> 的 token 作为结束；通过两 token 的起始行号在 state.src 中切片获取原文（不依赖 token 拆分细节）
        // 3. 使用 encodeURIComponent 编码，注入静态属性 code-enc="..."（避免 Vue 动态表达式与反引号风险）
        // 4. 保留原始缩进与换行，仅去除末尾多余空行 (trimEnd)
        md.core.ruler.after('inline', 'demo_auto_code', (state) => {
            const srcLines = state.src.split(/\r?\n/);
            const tokens = state.tokens;
            for (let i = 0; i < tokens.length; i++) {
                const t = tokens[i];
                if (t.type !== 'html_block' && t.type !== 'html_inline')
                    continue;
                if (!/<Demo(\s+[^>]*)?>/i.test(t.content)) continue;
                // 已有 code / :code / code-enc 属性则跳过
                if (/\s(?:code|:code|code-enc)=/i.test(t.content)) continue;

                // 检测是否同 token 即闭合
                const selfCloseMatch = t.content.match(
                    /<Demo[^>]*>([\s\S]*?)<\/Demo>/i
                );
                if (selfCloseMatch) {
                    const innerInline = selfCloseMatch[1];
                    const encodedInline = encodeURIComponent(
                        innerInline.trimEnd()
                    );
                    t.content = t.content.replace(
                        /<Demo([^>]*)>/i,
                        (m, g1) => `<Demo${g1} code-enc="${encodedInline}">`
                    );
                    continue;
                }

                // 常规多行：根据行号与后续关闭标签 token 查找
                const openLine = t.map ? t.map[0] : null;
                if (openLine == null) continue;
                let closeTokenIndex = -1;
                for (let j = i + 1; j < tokens.length; j++) {
                    const tj = tokens[j];
                    if (tj.type === 'html_block' || tj.type === 'html_inline') {
                        if (/<\/Demo>/i.test(tj.content)) {
                            closeTokenIndex = j;
                            break;
                        }
                    }
                }
                if (closeTokenIndex === -1) continue; // 未找到闭合，跳过
                const closeToken = tokens[closeTokenIndex];
                const closeLine = closeToken.map ? closeToken.map[0] : null;
                if (closeLine == null) continue;
                // 提取开闭标签之间的源码行（不含标签行）
                const innerLines = srcLines.slice(openLine + 1, closeLine);
                let innerRaw = innerLines.join('\n');
                // 兜底：如果内部为空并且中间 token 里仍然分散（极端情况）保留旧逻辑聚合
                if (!innerRaw && closeTokenIndex - i > 1) {
                    let fallback = '';
                    for (let k = i + 1; k < closeTokenIndex; k++) {
                        fallback += (tokens[k].content || '') + '\n';
                    }
                    innerRaw = fallback.trimEnd();
                }
                innerRaw = innerRaw.trimEnd();
                try {
                    const encoded = encodeURIComponent(innerRaw);
                    t.content = t.content.replace(
                        /<Demo([^>]*)>/i,
                        (m, g1) => `<Demo${g1} code-enc="${encoded}">`
                    );
                } catch (e) {
                    // 编码失败则忽略（极少发生）
                }
            }
        });
    };
}
