## 变更记录（2025-09-27）

本次改造重点：命名统一 + TypeScript 引入 + Button 规范化 + 文档与 tokens 初步增强。

### 改动要点

1. 引入 TypeScript：新增 `tsconfig.json`、`types.ts`，package.json 增加 `typescript`、`vue-tsc`，配置导出 types。
2. 入口重构：`install.js` 迁移为 `src/install.ts`，`src/index.ts` 导出 install 与组件。
3. 组件命名：统一前缀 `Buig`（示例已完成 `BuigButton`）。后续其他组件逐步补充内部 defineOptions 与类名前缀。
4. Button 事件策略：内部 emit `click`，对外文档继续使用 `@onClick`（映射策略将在后续统一说明）。
5. 样式 tokens 扩展：新增 hover / active / disabled / font-size 变量；Button 使用变量化。
6. 文档改造：更新 `docs/index.md` 与 `01-Button.md` 中示例；准备删除重复 `docs/markdown` 目录（已移除）。
7. 导出结构：package.json exports 增加 types 映射，组件通配路径从 `.vue.js` 调整为 `.js`。

### 待办展望

- 其余组件统一改名前缀与 TS 化。
- 事件命名策略与文档 API 表格生成脚本。
- Tokens 体系进一步语义化（色板、尺寸、排版）。
- SideEffects 精简与构建产物 d.ts 完整性验证。

（本文件用于记录变更，不修改 AGENTS.md）

### 第二阶段（局部执行 2025-09-27 后续补充）

- 已改造组件：Button / Alert / Input / Spinner。
- 删除旧根级 `install.js`，仅保留 `src/install.ts`。
- 事件内部统一采用语义名（如 Alert: close, Input: input/change/focus/blur）。
- 下一批计划：剩余所有组件名前缀与样式类替换，抽离硬编码颜色为 tokens。

### 第三阶段（2025-09-27 晚间）

本阶段完成：

1. 批量组件前缀与 TS 化（二批 + 三批）：Avatar / Badge / Breadcrumb / Card / Checkbox / Radio / Textarea / Select / Switch / Slider / Dialog / Drawer / Toast / Tooltip / Popover / Progress / Skeleton / Tag / Steps / Tabs / Pagination 全量迁移。
2. 事件统一：移除旧 `onChange` / `onInput` / `onClose` 命名，内部统一语义：`change`、`input`、`close`；双向绑定继续使用 `update:*`。
3. Tokens 扩展：新增 semantic color（success / warning / danger / border / subtle / bg / text 等）与阴影变量，为后续去硬编码做准备。
4. 新增安装一致性：所有组件使用 `defineOptions({ name: 'BuigXxx' })` 与 BEM `.buig-xxx`。
5. 过渡策略：暂未批量替换所有硬编码色值（例如若干边框 #d9d9d9 / 背景 #eee 等），已在 tokens 中提供映射变量，后续集中替换。

后续计划（下阶段优先级）：

1. 硬编码样式全面变量化（边框、背景、阴影、语义状态颜色）。
2. 生成统一的组件 API 文档（脚本化 Props/Events/Slots 表格）。
3. 设计 size / variant 通用规范（对 Button / Tag / Input / Switch 等统一）。
4. 进行一次全局 grep 确认无遗留 `yii-` 与旧事件名；若有补齐。
5. README 同步最新使用示例（install + 按需引入）。
6. 视需要添加 `types.ts` 中更多公共类型（例如通用 Size/Variant 联合类型枚举）。

（第三阶段记录完毕）

### 第四阶段（2025-09-27 深夜）组件目录纯化

本阶段目标：确保 `src/components` 目录仅包含 `.vue` 单文件，去除额外聚合脚本文件，满足结构约束与 Tree-Shaking 期望。

已执行事项：

1. 新增顶层 `src/components.ts`，集中具名导出所有组件（避免在组件目录放置聚合文件）。
2. 调整 `src/index.ts` 改为 `export * from './components';` 指向新的聚合入口。
3. 删除 `src/components/index.js`（遗留 `Buig*` 命名导出）与 `src/components/index.ts`（已冗余）。
4. 现 `src/components/` 下仅保留各组件 `.vue` 文件，实现目录纯化。

后续待办（延续上阶段 + 新增）：

1. README：新增安装、全量注册、按需引入、size/variant 与 Tokens 自定义示例。
2. 构建与类型校验：执行 `bun run build` 与 `vue-tsc --noEmit`，记录潜在告警。
3. gen:meta 稳定性增强（可选）：为脚本增加 try/catch、开始/结束日志与失败 `process.exit(1)`。
4. 公共样式抽象：提炼复用 Focus Ring / 间距 / 尺寸工具类，减少组件内重复。
5. 全局 grep：检查遗留 `Buig`、硬编码十六进制颜色（逐步替换为 tokens）。
6. 追加 Size/Variant 方案推广到尚未接入的组件（除已改 Button/Input/Tag 之外）。
7. 生成脚本输出的 Components API 文档预留多语言结构（当前仍仅中文内容）。

（第四阶段记录完毕）

### 后续补充（2025-09-27 深夜）样式变量文件重命名

执行方案 A：`src/styles/tokens.css` 重命名为 `src/styles/variable.css`。

变更原因：

1. 名称更贴合内容（集中存放 CSS Variables），避免与后续更完整 Token 体系（可能拆分色板/尺寸/语义层）混淆。
2. 为将来加入 design tokens 构建/生成脚本（例如按主题拆分）预留语义空间。

影响与处理：

1. 构建入口由 `styles/tokens` -> `styles/variable`（`vite.config.js` 已更新）。
2. 文档中 import 与描述全部替换为 `variable.css`；旧文件已删除，不保留兼容别名。
3. 若已有使用者依赖 `buig/styles/tokens.css` 路径，将在版本说明中提示手动迁移。

后续计划：

1. 评估拆分 `variable.css` 为主题化结构（`colors.css`、`sizes.css` 等）。
2. 在 README 新增变量覆盖示例（主题自定义指引）。

（此条为记录性变更说明）

### 后续补充（2025-09-27 夜间晚些）移除旧聚合 variable.css

执行：彻底删除 `src/styles/variable.css`，不再保留兼容别名。

新增：

1. `core.css` 作为新的显式聚合（包含 foundation/semantic/component）
2. `all.css` 聚合 core + dark（暗色仍需设置 `data-theme="dark"` 才生效）

构建：`vite.config.js` 移除 `styles/variable` 入口，新增 `styles/core` 与 `styles/all`。

文档：全部 import 示例替换为 `core.css`；变量文档移除旧标题 `(variable.css)`；Button 示例说明更新。

脚本：保持扫描分层文件，不依赖 variable.css。

理由：减少多层间接聚合命名歧义，提供更语义化入口（core/all），避免用户继续依赖已废弃路径。

潜在影响：旧使用者需更新导入语句；此变更视为下一版本（>=0.0.7）breaking（虽然仍处 0.x ）。

（此条为记录性变更说明）

### 后续补充（2025-09-27 夜间）变量体系分层重构

本次将单一 `variable.css` 拆分为分层结构：

1. `foundation.css`：基础原子（调色板 neutral / primary / success / warning / danger / info 阶梯、尺寸、spacing、圆角、阴影、动效、层级）
2. `semantic.css`：语义映射（背景/文本/边框/状态/控件尺寸语义变量），引用 palette 原子
3. `component.css`：首批组件级变量（Button / Input / Card），暴露 `--ui-button-*`、`--ui-input-*`、`--ui-card-*`
4. `dark.css`：仅覆盖语义层与组件层变量（未直接修改 foundation 原子）
5. `variable.css`：聚合入口，通过 `@import` 引入 foundation / semantic / component，保留对外兼容

脚本更新：

- `genVariables.ts` 改为扫描多文件并按文件分组生成表格
- `appendVariablesSection.ts` 支持组件级前缀匹配（严格前缀 + 宽松包含两级策略）

引入方式推荐：

- 精细：按需引入层级文件
- 便捷：继续使用 `variable.css` 聚合
- 暗色：额外引入 `dark.css`，通过 `html[data-theme='dark']` 激活

后续计划：

1. 扩展更多组件级变量（Select / Tag / Alert 等）
2. 引入对比度/可访问性验证（可选）
3. 评估是否需要 aliases.css 过渡层（当前无历史包袱暂不添加）
4. 增加 motion 曲线补充（focus ring 动画、进出场过渡统一）

（此条为记录性变更说明）

### 后续补充（2025-09-27 深夜）暗色预设文件新增

新增 `src/styles/dark.css`，提供基于 `html[data-theme='dark']` 的暗色变量覆写：

- 背景 / 文本 / 边框 / 阴影 / 中性层变量覆盖
- 通过设置 `document.documentElement.setAttribute('data-theme','dark')` 激活

构建：`vite.config.js` 增加入口 `styles/dark`，可通过 `import 'buig/styles/dark.css'` 按需引入。

后续计划：

1. 细化暗色下 primary / success / warning / danger 的对比度适配。
2. 提供自动主题切换示例（监听系统 prefers-color-scheme）。
3. 与未来主题拆分（colors/sizes）脚本联动自动再生成。

（此条为记录性变更说明）

### 后续补充（2025-09-27 深夜稍后）移除 legacy 样式文件 variable.css / tokens.css

执行：删除 `src/styles/variable.css` 与 `src/styles/tokens.css`，统一以 `core.css` / `all.css` 作为聚合入口。前者（variable.css）为早期聚合保留的兼容层，后者（tokens.css）为旧集中变量文件，均已被分层（foundation / semantic / component / dark）取代。

影响：

1. 文档与示例已全部使用 `core.css` 或 `all.css`；
2. 生成脚本 `genVariables.ts` 注释更新，不再提及 variable.css；
3. MIGRATION-0.0.7.md 已记录聚合替换策略；
4. 若历史用户仍引用 `styles/variable.css` 或 `styles/tokens.css`，需手动迁移。

不兼容性：视为 0.0.x 内部架构整理（仍写入迁移文档避免困惑）。

后续：保持分层结构稳定，待引入主题扩展（更多模式）再评估是否需要 alias 聚合层。

（此条为记录性变更说明）
