# Space 间距

用于在一组元素之间提供统一的水平 / 垂直间距，并支持换行、对齐与分隔符。

## 演示

<Demo title="基础用法">
<template #source>
<BuigSpace>
  <div v-for="n in 3" :key="n">Item {{n}}</div>
</BuigSpace>
</template>
</Demo>

<Demo title="垂直方向">
<template #source>
<BuigSpace direction="vertical">
  <div v-for="n in 3" :key="n" style="background:#f4f4f4;padding:4px 8px;">Block {{n}}</div>
</BuigSpace>
</template>
</Demo>

<Demo title="尺寸映射">
<template #source>
<BuigSpace size="mini"><span v-for="n in 3" :key="'m'+n">mini {{n}}</span></BuigSpace>
<BuigSpace size="small" style="margin-top:8px"><span v-for="n in 3" :key="'s'+n">small {{n}}</span></BuigSpace>
<BuigSpace size="medium" style="margin-top:8px"><span v-for="n in 3" :key="'md'+n">medium {{n}}</span></BuigSpace>
<BuigSpace size="large" style="margin-top:8px"><span v-for="n in 3" :key="'l'+n">large {{n}}</span></BuigSpace>
</template>
</Demo>

<Demo title="双向尺寸数组 + wrap">
<template #source>
<BuigSpace :size="[24,4]" wrap>
  <BuigButton v-for="n in 14" :key="n" size="small">Btn {{n}}</BuigButton>
</BuigSpace>
</template>
</Demo>

<Demo title="主轴分布与对齐">
<template #source>
<BuigSpace justify="space-between" align="center" style="width:100%;border:1px dashed #ddd;padding:8px;">
  <div>A</div>
  <div style="font-size:26px">B big</div>
  <div>C</div>
</BuigSpace>
</template>
</Demo>

<Demo title="分隔符 split 插槽">
<template #source>
<BuigSpace>
  <template #split><span style="color:#aaa">|</span></template>
  <span>Link</span>
  <span>Profile</span>
  <span>Setting</span>
</BuigSpace>
</template>
</Demo>

<Demo title="垂直 fill 拉伸">
<template #source>
<BuigSpace direction="vertical" fill style="border:1px solid #e0e0e0;padding:8px;max-width:240px;">
  <div style="background:#eee">Row 1</div>
  <div style="background:#ddd">Row 2</div>
  <div style="background:#ccc">Row 3 宽度 100%</div>
</BuigSpace>
</template>
</Demo>

## Props

| Prop      | 类型                                                                                 | 默认值                 | 说明                                 |
| --------- | ------------------------------------------------------------------------------------ | ---------------------- | ------------------------------------ |
| size      | number \| 'mini' \| 'small' \| 'medium' \| 'large' \| [BuigSpaceSize, BuigSpaceSize] | 'small'                | 间距，单值或数组 [x,y]               |
| direction | 'horizontal' \| 'vertical'                                                           | 'horizontal'           | 布局方向                             |
| align     | 'start' \| 'center' \| 'end' \| 'baseline'                                           | horizontal 默认 center | 交叉轴对齐方式                       |
| justify   | 'start' \| 'center' \| 'end' \| 'space-between' \| 'space-around' \| 'space-evenly'  | -                      | 主轴分布方式                         |
| wrap      | boolean                                                                              | false                  | 是否允许换行（仅 horizontal 有意义） |
| fill      | boolean                                                                              | false                  | vertical 模式使子项 width:100%       |

## Slots

| Slot    | 说明                             |
| ------- | -------------------------------- |
| default | 间距内容子节点                   |
| split   | 分隔符节点，插入在相邻子节点之间 |

## 设计说明

- 以 flex + gap 实现，避免 margin 级联复杂度。
- 分隔符包装元素 `.buig-space__split` 方便自定义样式。
- 不对 gap 做半值扣减，保持实现简单。
- 过滤空文本与注释 vnode。

## 后续可能扩展

- stretch（主轴等分）
- 响应式 size 对象
- tag 指定根元素标签
