# Button 按钮

功能完整的按钮组件，参考 Arco Button 能力并结合本项目命名约定实现。支持多风格(type)、状态(status)、形状(shape)、尺寸(size)、占满(long)、链接模式、延迟 loading、图标插槽/属性等。

## 基础用法

<DemoBlock title="基础按钮类型" :code="`<BuigButton buttonType='primary'>...</BuigButton>`">
    <BuigButton buttonType="primary">主要按钮</BuigButton>
    <BuigButton buttonType="secondary">次级按钮</BuigButton>
    <BuigButton buttonType="outline">描边按钮</BuigButton>
    <BuigButton buttonType="text">文字按钮</BuigButton>
</DemoBlock>

## 状态 (status)

当 type=primary 时常与不同状态颜色结合：

<DemoBlock title="状态色（需 primary 组合）" :code="`<BuigButton buttonType='primary' status='success'>...</BuigButton>`">
    <BuigButton buttonType="primary" status="success">成功</BuigButton>
    <BuigButton buttonType="primary" status="warning">警告</BuigButton>
    <BuigButton buttonType="primary" status="danger">危险</BuigButton>
</DemoBlock>

## 形状 (shape)

<DemoBlock title="形状" :code="`<BuigButton shape='round'>...</BuigButton>`">
    <BuigButton shape="round" buttonType="primary">圆角</BuigButton>
    <BuigButton shape="circle" buttonType="primary" icon="demo" />
</DemoBlock>

## 尺寸 (size)

支持：mini / small / medium / large

<DemoBlock title="尺寸" :code="`<BuigButton size='mini'>Mini</BuigButton>`">
    <BuigButton size="mini">Mini</BuigButton>
    <BuigButton size="small">Small</BuigButton>
    <BuigButton size="medium">Medium</BuigButton>
    <BuigButton size="large">Large</BuigButton>
</DemoBlock>

## 链接模式

设置 href 后自动渲染为 a 标签。

<DemoBlock title="链接模式" :code="`<BuigButton href='https://example.com'>跳转链接</BuigButton>`">
    <BuigButton href="https://example.com" target="_blank" buttonType="text">跳转链接</BuigButton>
</DemoBlock>

## Loading 与延迟

loadingDelay 可避免闪烁：

<DemoBlock title="Loading 延迟" :code="`<BuigButton :loading='true'>提交中</BuigButton>`">
    <BuigButton :loading="true">提交中</BuigButton>
</DemoBlock>

## 占满宽度

<DemoBlock title="占满宽度" :code="`<BuigButton long>提交</BuigButton>`">
    <BuigButton long buttonType="primary">提交</BuigButton>
</DemoBlock>

## 图标

支持 icon 属性或 icon 插槽（插槽优先）。

<DemoBlock title="图标" :code="`<BuigButton icon='demo' />`">
    <BuigButton icon="demo" />
    <BuigButton>
        <template #icon>★</template>
        图标按钮
    </BuigButton>
</DemoBlock>

## Props

| 名称         | 类型        | 默认值    | 说明                       |          |                  |                                 |          |
| ------------ | ----------- | --------- | -------------------------- | -------- | ---------------- | ------------------------------- | -------- |
| buttonType   | `primary    | secondary | dashed                     | outline  | text`            | `secondary`                     | 风格类型 |
| status       | `normal     | warning   | success                    | danger`  | `normal`         | 状态着色（与 primary 组合常用） |          |
| shape        | `square     | round     | circle`                    | `square` | 形状             |                                 |          |
| size         | `mini       | small     | medium                     | large`   | `medium`         | 尺寸体系                        |          |
| long         | `boolean`   | `false`   | 是否占满父级宽度           |          |                  |                                 |          |
| loading      | `boolean`   | `false`   | 是否处于加载态             |          |                  |                                 |          |
| loadingDelay | `number`    | `-`       | 进入加载态的延迟(ms)       |          |                  |                                 |          |
| disabled     | `boolean`   | `false`   | 是否禁用                   |          |                  |                                 |          |
| htmlType     | `button     | submit    | reset`                     | `button` | 原生 button type |                                 |          |
| autofocus    | `boolean`   | `false`   | 挂载后是否自动聚焦         |          |                  |                                 |          |
| href         | `string`    | `-`       | 传入即渲染为 a 标签        |          |                  |                                 |          |
| target       | `\_blank    | \_self    | \_parent                   | \_top`   | `_self`          | 链接打开方式                    |          |
| icon         | `Component` | -         | 图标组件（若无 icon 插槽） |          |                  |                                 |          |

## 事件

| 名称  | 参数               | 说明                                   |
| ----- | ------------------ | -------------------------------------- |
| click | `(ev: MouseEvent)` | 点击事件（在 loading/disabled 时阻止） |

## 插槽

| 名称    | 说明                           |
| ------- | ------------------------------ |
| default | 按钮文本/内容                  |
| icon    | 自定义图标（优先于 icon 属性） |

## Expose

| 方法  | 说明     |
| ----- | -------- |
| focus | 聚焦按钮 |

## 注意事项

1. loadingDelay 仅在 loading 进入时生效；离开 loading 会立即结束。
2. 链接模式下 (href) 不再使用 disabled attribute，但仍会通过类名禁止交互与样式淡化。

## TODO (后续可能扩展)

1. 统一状态色与语义色的 token 映射。
2. 增加块级 loading 进度提示（如旋转器可自定义）。

## 后续计划

- 抽离样式到 `style/index.scss` 并变量化 hover/active/focus
- 集成统一 focus ring 方案
- 增加 `loading` 插槽或内置旋转图标

---

（本文件为试点文档，后续批量迁移后可能合并到主文档体系）
