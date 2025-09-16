# Input 输入框

## 实时示例

<ClientOnly>
  <div style="display:flex; gap:12px; align-items:center;">
    <YiiInput v-model="val" placeholder="请输入" />
    <YiiInput :disabled="true" placeholder="禁用" />
    <YiiInput :readonly="true" placeholder="只读" />
  </div>
  <p>值：{{ val }}</p>

  <script setup>
  import { ref } from 'vue'
  const val = ref('')
  </script>
</ClientOnly>

## 代码示例

```vue
<template>
    <div style="display:flex; gap:12px; align-items:center;">
        <YiiInput v-model="val" placeholder="请输入" />
        <YiiInput :disabled="true" placeholder="禁用" />
        <YiiInput :readonly="true" placeholder="只读" />
    </div>
    <p>值：{{ val }}</p>
</template>

<script setup>
import { ref } from 'vue';
const val = ref('');
</script>
```
