# Button 按钮

最常用的操作触发组件。当前为目录化试点结构：`button.vue` + `types.ts` + `style/` + `demo/`。

## 基础使用

```vue
<template>
    <BuigButton variant="primary">提交</BuigButton>
</template>
```

## Props

| 名称     | 类型      | 默认    | 说明               |
| -------- | --------- | ------- | ------------------ | -------- | ------------ | --------- | -------- |
| variant  | `primary  | success | warning            | danger   | neutral`     | `primary` | 视觉语义 |
| size     | `xs       | sm      | md                 | lg`      | `md`         | 尺寸      |
| disabled | `boolean` | `false` | 禁用               |
| loading  | `boolean` | `false` | 加载态（阻止点击） |
| type     | `button   | submit  | reset`             | `button` | 按钮原生类型 |

## Events

| 事件  | 说明                            |
| ----- | ------------------------------- |
| click | 点击触发（非 disabled/loading） |

## Slots

| 插槽    | 说明     |
| ------- | -------- |
| default | 按钮内容 |

## 后续计划

- 抽离样式到 `style/index.css` 并变量化 hover/active/focus
- 集成统一 focus ring 方案
- 增加 `loading` 插槽或内置旋转图标

---

（本文件为试点文档，后续批量迁移后可能合并到主文档体系）
