# Buig UI 文档

欢迎使用 Buig UI 组件库（MVP 草案重构版）。

## 快速开始

1. 安装（示例）

```bash
bun add buig
```

2. 引入（全量）

```ts
import { createApp } from 'vue';
import Buig, { BuigButton } from 'buig';
import 'buig/styles/tokens.css';
createApp(App).use(Buig).mount('#app');
```

3. 按需

```ts
import { BuigButton } from 'buig';
```

4. 使用

```vue
<BuigButton @onClick="handle">按钮</BuigButton>
```

## 设计规范快速摘录

-   BEM：`.buig-button`, `__content`, `--disabled`
-   事件：内部 emit `click`，对外监听 `onClick`
-   样式：CSS 变量 `--ui-*`，不在组件重复定义 :root

更多章节请进入左侧导航查看。
