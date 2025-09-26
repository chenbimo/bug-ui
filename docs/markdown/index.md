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
import 'buig/styles/tokens.css';
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
