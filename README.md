# Buig UI

实验性 Vue3 组件库（MVP 阶段）。

## 安装

```bash
bun add buig
```

## 快速使用

```ts
import { createApp } from 'vue';
import * as Buig from 'buig';
import 'buig/styles/variable.css';
import App from './App.vue';

createApp(App).use(Buig).mount('#app');
```

按需引入：

```ts
import { BuigButton } from 'buig';
```

## 覆盖主题变量示例

在项目全局样式（如 `src/styles/theme.css`）中覆写变量：

```css
:root {
    --ui-color-primary: #6366f1; /* 自定义主色 */
    --ui-radius: 6px;
}
```

然后在入口确保先加载覆盖文件再加载组件库（或与 variable.css 顺序并列，后声明优先级覆盖）：

```ts
import './styles/theme.css';
import 'buig/styles/variable.css';
```

## 设计 Tokens（简述）

`variable.css` 汇总颜色/尺寸/阴影等基础语义。

变量完整列表：参见文档站 基础 -> 变量 或直接查看 `docs/markdown/01-基础/00-Variables.md`（脚本生成）。

生成/更新变量文档：

```bash
bun run gen:variables
```

> 若脚本执行失败，确保使用 Bun 最新版本，并确认 `src/styles/variable.css` 存在。

### 暗色模式（示例）

可以通过属性作用域提供一套暗色变量覆盖：

```css
html[data-theme='dark'] {
    --ui-color-bg: #18181b;
    --ui-color-bg-subtle: #27272a;
    --ui-color-text: #e4e4e7;
    --ui-color-text-secondary: #a1a1aa;
    --ui-color-border: #3f3f46;
    --ui-shadow-overlay: 0 10px 30px rgba(0, 0, 0, 0.6);
}
```

在运行时切换：

```ts
document.documentElement.setAttribute('data-theme', 'dark');
```

或直接引入提供的暗色预设文件（包含基础暗色变量覆盖）：

```ts
import 'buig/styles/variable.css'; // 基础变量
import 'buig/styles/dark.css'; // 暗色变量（通过 data-theme 控制生效）
```

> 注意：`dark.css` 使用选择器 `html[data-theme='dark']`，只有在设置该属性后才会覆盖变量。

## 许可证

Apache-2.0
