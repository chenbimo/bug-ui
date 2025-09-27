---
title: 首页
---

# Buig UI

实验性 Vue 3 组件库（MVP 重构阶段）。当前侧边栏为手工维护的静态配置。

## 快速开始

```bash
bun add buig
```

```ts
import { createApp } from 'vue';
import * as Buig from 'buig';
import 'buig/styles/variable.css';
createApp(App).use(Buig).mount('#app');
```

按需：

```ts
import { BuigButton } from 'buig';
```

## 目录说明

-   组件文档分组：依赖 `docs/markdown/<数字-分类>/<数字-组件>.md` 命名排序
-   新增文档后需在 `docs/.vitepress/config.mjs` 手工更新侧边栏

## 下一步

计划补充：Size / Variant 体系说明、Tokens 自定义指引、自动生成的 API 表。

---

更多请通过左侧侧边栏进入具体组件。

## 覆盖主题变量示例

在你的项目中创建自定义主题文件（例如 `src/styles/theme.css`）：

```css
:root {
    --ui-color-primary: #6366f1; /* 自定义主色 */
    --ui-radius: 6px; /* 统一圆角 */
}
```

入口中引入（注意顺序，后引入可覆盖前面的变量值）：

```ts
import './styles/theme.css';
import 'buig/styles/variable.css';
```

实战建议：

1. 仅覆写需要变化的变量，避免整块复制，降低未来升级合并冲突。
2. 可通过开发者工具查看某元素使用的变量名称再定向覆写。
3. 若需要暗色模式，后续可通过 `html[data-theme='dark'] { ... }` 作用域再加一套覆盖。
