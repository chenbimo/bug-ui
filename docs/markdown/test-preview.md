# Demo 预览测试（文件名后续可改为 test-demo.md）

以下代码块应被转换为 DemoPreview（使用 ```vue preview 触发）：

```vue preview
<template>
    <div style="padding:8px;">
        <BuigButton variant="primary">按钮示例</BuigButton>
    </div>
</template>
```

下面这个不加 preview 关键词，应保持普通高亮，不被执行：

```vue
<template>
    <div>纯展示，不执行</div>
</template>
```
