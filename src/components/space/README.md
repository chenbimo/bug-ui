# Space 间距

用于在一组元素之间提供统一的水平 / 垂直间距，并支持换行、对齐与分隔符。

> 实现基于 flex + gap；支持 size 数组 [x, y] 指定横纵不同间距。

## 基础用法

```vue
<template>
    <BuigSpace>
        <div v-for="n in 3" :key="n">Item {{ n }}</div>
    </BuigSpace>
</template>
```

## 垂直

```vue
<BuigSpace direction="vertical">
  <div v-for="n in 3" :key="n">Block {{n}}</div>
</BuigSpace>
```

## 尺寸 size

```vue
<BuigSpace size="mini"> <span v-for="n in 3" :key="n">mini {{n}}</span> </BuigSpace>
<BuigSpace size="small"> <span v-for="n in 3" :key="n">small {{n}}</span> </BuigSpace>
<BuigSpace size="medium"> <span v-for="n in 3" :key="n">medium {{n}}</span> </BuigSpace>
<BuigSpace size="large"> <span v-for="n in 3" :key="n">large {{n}}</span> </BuigSpace>
```

## 双向尺寸数组

```vue
<BuigSpace :size="[24, 4]" wrap>
  <div v-for="n in 12" :key="n">Box {{n}}</div>
</BuigSpace>
```

## Wrap 换行

```vue
<BuigSpace wrap>
  <BuigButton v-for="n in 18" :key="n" size="small">Btn {{n}}</BuigButton>
</BuigSpace>
```

## 对齐与主轴分布

```vue
<BuigSpace align="start" justify="space-between" style="width:100%">
  <div>A</div>
  <div style="font-size:24px">B big</div>
  <div>C</div>
</BuigSpace>
```

## 分隔符 split

```vue
<BuigSpace>
  <template #split>
    <span style="color:var(--buig-color-text-secondary)">|</span>
  </template>
  <span>Link</span>
  <span>Profile</span>
  <span>Setting</span>
</BuigSpace>
```

## fill （垂直扩展宽度）

```vue
<BuigSpace direction="vertical" fill style="border:1px solid var(--buig-color-border);padding:8px;">
  <div style="background:#eee">Row 1</div>
  <div style="background:#ddd">Row 2</div>
</BuigSpace>
```

## Props

| Prop      | 类型                                                                                 | 默认值          | 说明                                 |
| --------- | ------------------------------------------------------------------------------------ | --------------- | ------------------------------------ |
| size      | number \| 'mini' \| 'small' \| 'medium' \| 'large' \| [BuigSpaceSize, BuigSpaceSize] | 'small'         | 间距，单值或数组 [x,y]               |
| direction | 'horizontal' \| 'vertical'                                                           | 'horizontal'    | 方向                                 |
| align     | 'start' \| 'center' \| 'end' \| 'baseline'                                           | 水平默认 center | 交叉轴对齐                           |
| justify   | 'start' \| 'center' \| 'end' \| 'space-between' \| 'space-around' \| 'space-evenly'  | -               | 主轴分布                             |
| wrap      | boolean                                                                              | false           | 是否允许换行（仅 horizontal 有意义） |
| fill      | boolean                                                                              | false           | vertical 模式让子元素宽度 100%       |

## Slots

| Slot    | 说明                         |
| ------- | ---------------------------- |
| default | 间距内容子节点               |
| split   | 节点分隔符，插入相邻子项之间 |

## 设计说明

- 使用 flex + gap，不对分隔符 gap 作半值修正。
- 过滤空文本与注释节点，减少无意义间距。
- align 默认在水平模式为 center。

## TODO / 后续可能扩展

- stretch 模式（子项 flex:1）
- 响应式 size （对象式断点）
- tag 自定义渲染标签
