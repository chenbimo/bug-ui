# 主题切换与暗色模式

本页介绍如何在项目中集成 **Buig** 的主题分层与暗色模式切换策略。

## 分层与聚合回顾

| 文件             | 作用       | 说明                                                    |
| ---------------- | ---------- | ------------------------------------------------------- |
| `foundation.css` | 基础原子   | 调色板 / 尺寸 / 间距 / 动效 / 阴影 / 层级等原子 tokens  |
| `semantic.css`   | 语义映射   | 背景 / 文本 / 边框 / 状态颜色 / 控件尺寸语义变量        |
| `component.css`  | 组件级变量 | Button / Input / Card / Select / Tag / Alert 等前缀变量 |
| `dark.css`       | 暗色覆写   | 仅在 `html[data-theme='dark']` 下对语义与组件变量做覆盖 |
| `core.css`       | 明亮聚合   | = foundation + semantic + component                     |
| `all.css`        | 全量聚合   | = core + dark （仍需设置 data-theme 才会激活暗色）      |

> 已移除 legacy: `variable.css` / `tokens.css`，请使用 `core.css` 或 `all.css`。

## 快速使用

只使用明亮主题：

```ts
import 'buig/styles/core.css';
```

同时准备暗色（推荐）：

```ts
import 'buig/styles/all.css';
// 切换时只需操作 data-theme 属性
```

## 运行时切换示例（Vue 3）

```vue
<script setup lang="ts">
import { ref, onMounted } from 'vue';

const mode = ref<'light' | 'dark'>('light');

function applyTheme(m: 'light' | 'dark') {
    mode.value = m;
    document.documentElement.setAttribute('data-theme', m);
    localStorage.setItem('buig-theme', m);
}

onMounted(() => {
    const saved = localStorage.getItem('buig-theme');
    if (
        saved === 'dark' ||
        (saved == null &&
            window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
        applyTheme('dark');
    } else {
        applyTheme('light');
    }
});
</script>

<template>
    <div class="demo-theme-toggle">
        <button @click="applyTheme(mode === 'light' ? 'dark' : 'light')">
            切换到 {{ mode === 'light' ? '暗色' : '明亮' }}
        </button>
        <p>当前主题：{{ mode }}</p>
    </div>
</template>

<style scoped>
.demo-theme-toggle {
    display: flex;
    gap: 12px;
    align-items: center;
}
</style>
```

## 防止首屏闪烁（FOUC）

在页面 HTML 模板（或 SSR 输出）中直接注入初始主题：

```html
<!DOCTYPE html>
<html lang="zh-CN" data-theme="dark">
    <!-- 若希望默认暗色 -->
    <head>
        <meta charset="UTF-8" />
        <script>
            // 可选：在 JS 运行前用 localStorage 决定初始 data-theme
            (function () {
                try {
                    var t = localStorage.getItem('buig-theme');
                    if (t) {
                        document.documentElement.setAttribute('data-theme', t);
                    }
                } catch (e) {}
            })();
        </script>
    </head>
    <body>
        <div id="app"></div>
    </body>
</html>
```

## 自定义变量覆盖

可以在项目自己的样式文件中覆写语义或组件变量（放在 Buig 样式之后）：

```css
:root {
    --ui-color-primary: #6366f1; /* 自定义品牌色 */
    --ui-button-radius: 10px; /* 自定义按钮圆角 */
}
html[data-theme='dark'] {
    --ui-color-primary: #818cf8; /* 暗色下适度调整亮度 */
}
```

> 建议使用语义层变量（如 `--ui-color-primary`）优先定制，不直接改 palette 原子，保持后续可扩展性。

## 使用 tokens（TS / JSON）

```ts
import { tokens } from 'buig/tokens';
console.log(tokens.semantic['--ui-color-primary']);
```

或 JSON（构建后 dist 中提供）：

```ts
import tokensJson from 'buig/dist/tokens.json';
```

## 对比度辅助检查

运行：

```bash
bun run check:contrast
```

示例输出（若存在差异）：

```
[contrast] light --ui-color-text-secondary on --ui-color-bg-muted = 3.90 (<4.5)
[contrast] Completed with 1 warnings.
```

> 根据警告可以调整语义变量或暗色覆写，提高可读性。

## 常见问题 FAQ

1. 暗色样式不生效？
    - 是否引入了 `all.css` 或单独的 `dark.css`。
    - 是否正确设置了 `data-theme="dark"`。
2. 想要只在某个容器暗色？
    - 当前方案为全局变量层切换，局部暗色需后续提供作用域方案（待规划）。
3. 能否只引入部分层？
    - 可以按需直接 import 单个层文件（需自理依赖层顺序），通常推荐使用聚合。

## 后续规划

- 计划引入：系统主题响应（监听 `prefers-color-scheme` 变化自动切换）
- 多主题扩展：新增自定义品牌主题示例与构建时 token diff
- 局部作用域主题（CSS 变量前缀隔离或容器查询）评估

---

> 本页内容会随 Token 体系演进更新，若发现示例失效，请查看 `NOTE.md` 变更记录。
