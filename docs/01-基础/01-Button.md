# Button 按钮

下面是一个在文档站直接可交互的示例（组件已全局注册，且已引入 tokens.css）。

<ClientOnly>
    <div style="display:flex; gap:12px; align-items:center;">
        <BuigButton @onClick="onClick">默认按钮</BuigButton>
        <BuigButton :loading="loading" @onClick="toggle">
            {{ loading ? '加载中' : '点我加载' }}
        </BuigButton>
        <BuigButton :disabled="true">禁用</BuigButton>
    </div>
    <p>日志：{{ log }}</p>

    <script setup>
    import { ref } from 'vue'
    const loading = ref(false)
    const log = ref('')
    function onClick(){ log.value = 'clicked!' }
    function toggle(){ loading.value = !loading.value }
    </script>

</ClientOnly>

## 代码示例

```vue
<template>
    <div style="display:flex; gap:12px; align-items:center;">
        <BuigButton @onClick="onClick">默认按钮</BuigButton>
        <BuigButton :loading="loading" @onClick="toggle">
            {{ loading ? '加载中' : '点我加载' }}
        </BuigButton>
        <BuigButton :disabled="true">禁用</BuigButton>
    </div>
    <p>日志：{{ log }}</p>
</template>

<script setup>
import { ref } from 'vue';
const loading = ref(false);
const log = ref('');
function onClick() {
    log.value = 'clicked!';
}
function toggle() {
    loading.value = !loading.value;
}
</script>
```
