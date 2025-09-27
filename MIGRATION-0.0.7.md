# MIGRATION 0.0.7

本版本为样式变量体系的破坏性更新（仍处 0.x 但需手动调整）：

## 变更摘要

- 移除旧聚合文件：`src/styles/variable.css`
- 引入分层文件：`foundation.css` / `semantic.css` / `component.css`
- 新增聚合：`core.css`（三层合并）与 `all.css`（core + dark）
- 暗色文件 `dark.css` 保留，通过 `html[data-theme='dark']` 激活

## 迁移步骤

1. 搜索并替换：`'buig/styles/variable.css'` → `'buig/styles/core.css'`
2. 若之前按需覆盖主题变量，继续在自定义样式后引入 `core.css` 确保覆盖生效。
3. 使用暗色：
    ```ts
    import 'buig/styles/core.css';
    import 'buig/styles/dark.css';
    document.documentElement.setAttribute('data-theme', 'dark');
    ```
    或直接：
    ```ts
    import 'buig/styles/all.css'; // 仍需设置 data-theme 才启用暗色变量
    ```
4. 查看新变量列表：文档 → 基础 → 变量（分组展示）。

## 新增组件变量示例

`component.css` 中已经为 Button / Input / Card 暴露：`--ui-button-bg`、`--ui-input-border` 等前缀变量。

## 常见问题

| 问题               | 说明                                                           |
| ------------------ | -------------------------------------------------------------- |
| 引入后样式顺序错乱 | 确保自定义覆盖文件在 core/all 之前引入                         |
| 暗色不生效         | 检查 `data-theme='dark'` 属性是否设置在 `<html>`               |
| 找不到旧变量       | 某些变量已拆分为语义/组件前缀，参考变量文档或搜索 `--ui-` 前缀 |

## 后续计划

- 扩展更多组件级变量（Select / Tag / Alert ...）
- 导出 tokens JSON 与对比度校验脚本
- 引入设计时工具联动（后续）

---

如在迁移中发现遗漏场景，可在 ISSUE 中补充。
