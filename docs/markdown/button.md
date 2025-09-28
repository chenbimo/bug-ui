# Button 按钮

按钮用于触发一个即时操作。支持主题类型、语义状态、尺寸、形状、加载、禁用、链接模式与按钮组。

## 基础类型

<Demo title="基础类型">
<BuigButton type="secondary">Secondary</BuigButton>
<BuigButton type="primary">Primary</BuigButton>
<BuigButton type="dashed">Dashed</BuigButton>
<BuigButton type="outline">Outline</BuigButton>
<BuigButton type="text">Text</BuigButton>
</Demo>

## 语义状态（配合 primary）

<Demo title="语义状态">
<BuigButton type="primary" status="normal">Normal</BuigButton>
<BuigButton type="primary" status="success">Success</BuigButton>
<BuigButton type="primary" status="warning">Warning</BuigButton>
<BuigButton type="primary" status="danger">Danger</BuigButton>
</Demo>

## 尺寸

<Demo title="尺寸">
<BuigButton size="mini" type="primary">Mini</BuigButton>
<BuigButton size="small" type="primary">Small</BuigButton>
<BuigButton size="medium" type="primary">Medium</BuigButton>
<BuigButton size="large" type="primary">Large</BuigButton>
</Demo>

## 形状

<Demo title="形状">
<BuigButton shape="square" type="primary">Square</BuigButton>
<BuigButton shape="round" type="primary">Round</BuigButton>
<BuigButton shape="circle" type="primary" :long="false">C</BuigButton>
</Demo>

## 加载与禁用

<Demo title="加载与禁用">
<BuigButton loading type="primary">Loading</BuigButton>
<BuigButton disabled type="primary">Disabled</BuigButton>
<BuigButton loading disabled type="primary">Both</BuigButton>
</Demo>

## 链接模式

<Demo title="链接模式">
<BuigButton href="https://example.com" target="_blank" type="text">Link Button</BuigButton>
</Demo>

## 长按钮 (long)

<Demo title="长按钮 100%">
<div style="width:300px;display:flex;flex-direction:column;gap:8px;">
<BuigButton long type="primary">Primary Long</BuigButton>
<BuigButton long type="outline">Outline Long</BuigButton>
</div>
</Demo>

## 按钮组

<Demo title="按钮组">
<BuigButtonGroup type="primary" size="small">
	<BuigButton>Left</BuigButton>
	<BuigButton>Middle</BuigButton>
	<BuigButton>Right</BuigButton>
</BuigButtonGroup>
</Demo>

## Props

| 名称      | 说明                                                    | 类型           | 默认值      |
| --------- | ------------------------------------------------------- | -------------- | ----------- |
| type      | 主题类型：secondary / primary / dashed / outline / text | `ButtonType`   | `secondary` |
| status    | 语义状态：normal / warning / success / danger           | `ButtonStatus` | `normal`    |
| size      | 尺寸：mini / small / medium / large                     | `ButtonSize`   | `medium`    |
| shape     | 形状：square / round / circle                           | `ButtonShape`  | `square`    |
| long      | 宽度是否 100%                                           | `boolean`      | `false`     |
| loading   | 是否加载中                                              | `boolean`      | `false`     |
| disabled  | 是否禁用                                                | `boolean`      | `false`     |
| htmlType  | 原生 button type                                        | `string`       | `button`    |
| autofocus | 自动聚焦                                                | `boolean`      | `false`     |
| href      | 链接模式（若存在渲染为 a）                              | `string`       | `-`         |

## Events

| 事件  | 说明                              | 回调参数           |
| ----- | --------------------------------- | ------------------ |
| click | 点击（loading/disabled 时不触发） | `(ev: MouseEvent)` |

## Slots

| 名称    | 说明 |
| ------- | ---- |
| default | 内容 |
| icon    | 图标 |

> 注：样式为阶段实现，后续会加强基于 Tokens 的更细主题与状态视觉。
