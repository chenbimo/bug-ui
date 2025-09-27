# Buig UI

buig(big + bug + ui) - 有着大大的 BUG 的 Vue3 UI组件库

> 实验性 Vue3 组件库（MVP 阶段）。

## 安装

```bash
bun add buig
```

## 快速使用

```ts
import { createApp } from 'vue';
import * as Buig from 'buig';
import 'buig/styles/core.css';
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

然后在入口确保先加载覆盖文件再加载组件库（或直接使用分层/聚合 core.css，引入顺序后者可覆盖前者）：

```ts
import './styles/theme.css';
import 'buig/styles/core.css';
```

## 设计 Tokens（分层说明）

当前变量体系：

| 层级     | 文件           | 说明                                                |
| -------- | -------------- | --------------------------------------------------- |
| 基础原子 | foundation.css | 色板 / 尺寸 / 圆角 / 阴影 / 动效 / 层级             |
| 语义映射 | semantic.css   | 文本 / 背景 / 边框 / 主色 / 状态 / 控件尺寸语义桥接 |
| 组件级   | component.css  | 组件消费接口（如 `--ui-button-*`）                  |
| 主题覆盖 | dark.css       | 暗色模式覆盖语义 & 组件变量                         |
| 聚合入口 | core.css       | 聚合基础原子+语义+组件（不再保留旧 variable.css）   |

推荐引入（聚合）：

```css
@import 'buig/styles/core.css';
```

或按需精细引入：

```css
@import 'buig/styles/foundation.css';
@import 'buig/styles/semantic.css';
@import 'buig/styles/component.css';
```

变量完整列表：见文档站 基础 -> 变量（脚本生成，含分组）。

生成/更新变量文档：

```bash
bun run gen:variables
```

> 若脚本执行失败，确保使用 Bun 最新版本，并确认 `src/styles/{foundation,semantic,component}.css` 均存在。

### Tokens 导出 (TS / JSON)

库提供结构化 tokens 供构建工具或运行时消费：

```ts
import { tokens } from 'buig/tokens';
console.log(tokens.semantic['--ui-color-primary']);
```

生成 / 更新 `src/tokens.ts` 与根级 `tokens.json`：

```bash
bun run gen:tokens
```

也可直接读取构建产物中的 JSON：

```ts
import tokensJson from 'buig/dist/tokens.json';
```

### 对比度检测

运行自动对比度检查（当前检测 text / text-secondary 与多背景组合）：

```bash
bun run check:contrast
```

示例输出：

```
[contrast] light --ui-color-text-secondary on --ui-color-bg-muted = 3.90 (<4.5)
[contrast] Completed with 1 warnings.
```

若输出为 `All checked pairs pass` 则表示已满足最低 4.5 基线。

### 主题切换速览

一次性引入明亮+暗色：

```ts
import 'buig/styles/all.css';
```

切换：

```ts
document.documentElement.setAttribute('data-theme', 'dark');
```

更完整示例参见文档页：基础 -> 主题切换与暗色模式（ThemeToggle）。

### 迁移 (>=0.0.7)

若从旧版本升级：

1. 替换 `buig/styles/variable.css` 为 `buig/styles/core.css`
2. 如果之前手动引入暗色，请改用 `dark.css` 或直接 `all.css`
3. 删除对 `tokens.css` 的任何引用（已拆分）

详见 `MIGRATION-0.0.7.md`。

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

或直接引入文件：

```ts
import 'buig/styles/core.css'; // 核心变量
import 'buig/styles/dark.css'; // 暗色变量（通过 data-theme 控制生效）
```

> 注意：`dark.css` 使用选择器 `html[data-theme='dark']`，只有在设置该属性后才会覆盖变量。若需要一键引入再包含暗色覆盖，可使用 `import 'buig/styles/all.css'`（仍需设置 data-theme 才生效暗色）。

## 许可证

Apache-2.0
