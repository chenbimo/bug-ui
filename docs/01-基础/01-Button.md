# Button 按钮

下面的示例在文档站直接可交互（已全局注册组件且引入了 tokens.css）。

```vue
<template>
    <div style="display:flex; gap:12px; align-items:center;">
        <YiiButton @onClick="onClick">默认按钮</YiiButton>
        <YiiButton :loading="loading" @onClick="toggle()">{{ loading ? '加载中' : '点我加载' }}</YiiButton>
        <YiiButton :disabled="true">禁用</YiiButton>
    </div>
    <p>日志：{{ log }}</p>
    <style>
        /* 示例页内可使用全局 tokens 变量 */
    </style>
</template>

<script setup>
import { ref } from 'vue';
const loading = ref(false);
const log = ref('');
const onClick = () => {
    log.value = 'clicked!';
};
const toggle = () => {
    loading.value = !loading.value;
};
</script>
```
