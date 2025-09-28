# DemoBlock 组件

用于文档中包裹演示示例：包含预览区、说明、代码。

```vue
<DemoBlock
    title="按钮示例"
    :code="`<BuigButton buttonType='primary'>主要按钮</BuigButton>`"
>
  <BuigButton buttonType="primary">主要按钮</BuigButton>
</DemoBlock>
```

可通过 `desc` 插槽补充说明：

```vue
<DemoBlock title="按钮尺寸" :code="code">
  <template #desc>不同尺寸按钮示例。</template>
  <BuigButton size="mini">Mini</BuigButton>
  <BuigButton size="small">Small</BuigButton>
  <BuigButton size="medium">Medium</BuigButton>
  <BuigButton size="large">Large</BuigButton>
</DemoBlock>
```

## Props

| 名称     | 类型    | 默认值 | 说明                           |
| -------- | ------- | ------ | ------------------------------ |
| title    | string  | ''     | 标题                           |
| code     | string  | ''     | 代码文本显示                   |
| compact  | boolean | false  | 紧凑模式                       |
| bordered | boolean | true   | 是否显示边框（当前无差异占位） |

## 插槽

| 名称    | 说明     |
| ------- | -------- |
| default | 示例内容 |
| desc    | 描述文本 |

---

未来增强：

1. 复制代码按钮
2. 折叠/展开代码
3. 自动抓取 slot 源码
