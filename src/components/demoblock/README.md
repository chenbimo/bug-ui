# DemoBlock 示例容器

用于文档示例展示：包含预览、标题/描述、代码片段三部分。后续可扩展：折叠代码、复制、自动获取 slot 中源码等。

## 基础用法

```vue
<DemoBlock title="基础按钮" :code="`<BuigButton>按钮</BuigButton>`">
  <BuigButton>按钮</BuigButton>
</DemoBlock>
```

## Props

| 名称     | 类型    | 默认值 | 说明                                     |
| -------- | ------- | ------ | ---------------------------------------- |
| title    | string  | ''     | 标题文本                                 |
| code     | string  | ''     | 展示的代码文本（未来可自动生成）         |
| compact  | boolean | false  | 紧凑模式（减小内边距）                   |
| bordered | boolean | true   | 是否展示边框（当前与默认一致，预留扩展） |

## 插槽

| 名称    | 说明         |
| ------- | ------------ |
| default | 示例预览内容 |
| desc    | 描述文案     |

---

Todo:

1. 代码折叠/展开
2. 复制按钮
3. 自动抓取 slot 内部模板源码
